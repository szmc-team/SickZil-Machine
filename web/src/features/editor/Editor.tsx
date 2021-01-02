/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useEditorState } from '~/store/modules/editor'
import { useFileEntryLazyQuery } from '~/graphql'
import Konva from 'konva'
import { Stage, Layer, Image } from 'react-konva'
import { KonvaEventObject } from 'konva/types/Node'
import useImage from 'use-image'
import { Line } from 'konva/types/shapes/Line'
import { Dimension } from './types'
import { Vector2d } from 'konva/types/types'
import { useHistory, useHistoryState } from '~/store/modules/history'

const Editor: React.FC = () => {
  const { fileEntryId, mode } = useEditorState()
  const { draw: recordDrawing, initialize } = useHistory()
  const [loadFileEntry, { data }] = useFileEntryLazyQuery()
  const history = useHistoryState(fileEntryId)

  useEffect(() => {
    if (!fileEntryId) return
    loadFileEntry({ variables: { id: fileEntryId } })
    if (!history) initialize(fileEntryId)
  }, [loadFileEntry, fileEntryId, initialize, history])

  useEffect(() => {
    console.log(history)
  }, [history])

  const img = data?.fileEntry?.url
  const [image] = useImage(img || '')
  const [dimension, setDimension] = useState<Dimension>({
    width: image?.width || 0,
    height: image?.height || 0,
  })

  useEffect(() => {
    if (!image) return
    setDimension({
      width: image.width,
      height: image.height,
    })
  }, [image])

  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  const [scale, setScale] = useState<Vector2d>({ x: 1, y: 1 })

  const lastLine = useRef<Line>()
  const stageRef = useRef<Stage>(null)
  const layerRef = useRef<Konva.Layer>(null)

  const startDrawing = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (!stageRef.current || !layerRef.current) return
      setIsDrawing(true)
      const pos = stageRef.current.getStage().getPointerPosition()
      if (!pos) return

      lastLine.current = new Konva.Line({
        stroke: 'red',
        strokeWidth: 5,
        globalCompositeOperation:
          mode === 'draw' ? 'source-over' : 'destination-out',
        points: [pos.x / scale.x, pos.y / scale.y],
      })
      layerRef.current.add(lastLine.current)
    },
    [stageRef, layerRef, mode, scale]
  )

  const draw = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (!stageRef.current || !isDrawing || !lastLine.current) return

      const pos = stageRef.current?.getStage().getPointerPosition()
      if (!pos) return

      const newPoints = lastLine.current
        .points()
        .concat([pos.x / scale.x, pos.y / scale.y])
      lastLine.current.points(newPoints)
      layerRef.current?.batchDraw()
    },
    [isDrawing, scale]
  )

  const stopDrawing = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      setIsDrawing(false)

      if (fileEntryId && e.evt.type === 'mouseup') {
        recordDrawing(fileEntryId, layerRef.current?.toDataURL({})!)
      }
    },
    [fileEntryId, recordDrawing]
  )

  function zoom(e: WheelEvent) {
    if (!e.ctrlKey) return

    e.preventDefault()

    const isZoomOut = e.deltaY > 0

    if (isZoomOut && scale.x < 0.2) return

    setScale(vec => {
      return isZoomOut
        ? { x: vec.x - 0.1, y: vec.y - 0.1 }
        : { x: vec.x + 0.1, y: vec.y + 0.1 }
    })
  }

  return (
    <div css={styles.editor}>
      <label css={styles.label}>
        <div css={styles.stage}>
          <Stage
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onWheel={e => zoom(e.evt)}
            width={dimension.width * scale.x}
            height={dimension.height * scale.y}
            ref={stageRef}
          >
            <Layer>
              <Image image={image} scale={scale} />
            </Layer>
            <Layer ref={layerRef} scale={scale} />
          </Stage>
        </div>
      </label>
    </div>
  )
}
const styles = {
  label: css`
    display: block;
    width: 100%;
    height: 100%;
  `,
  stage: css`
    height: 100%;
    overflow: auto;
  `,
  editor: css`
    width: 100%;
    background-color: black;
    overflow: hidden;
  `,
}

export default Editor
