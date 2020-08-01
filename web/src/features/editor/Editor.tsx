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

const Editor: React.FC = () => {
  const { fileEntryId, mode } = useEditorState()
  const [loadFileEntry, { data }] = useFileEntryLazyQuery()

  useEffect(() => {
    if (fileEntryId) loadFileEntry({ variables: { id: fileEntryId } })
  }, [loadFileEntry, fileEntryId])

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

      console.log('pos', pos)
      console.log('scale', scale)
      console.log('pos with unscale', {
        x: pos.x / scale.x,
        y: pos.y / scale.y,
      })

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

  const stopDrawing = useCallback(() => setIsDrawing(false), [])

  function zoom(e: KonvaEventObject<WheelEvent>) {
    if (!e.evt.ctrlKey) return

    e.evt.preventDefault()
    const isZoomOut = e.evt.deltaY > 0
    setScale(vec => {
      console.log(vec)
      return isZoomOut
        ? { x: vec.x - 0.2, y: vec.y - 0.2 }
        : { x: vec.x + 0.2, y: vec.y + 0.2 }
    })
  }

  return (
    <div css={styles.editor}>
      <label
        css={css`
          display: block;
          width: 100%;
          height: 100%;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 100%;
            align-items: center;
            overflow: auto;
          `}
        >
          <Stage
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onWheel={zoom}
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
  editor: css`
    width: 100%;
    background-color: black;
    overflow: hidden;
  `,
}

export default Editor
