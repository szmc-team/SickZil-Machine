/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useEditorState } from '~/store/modules/editor'
import { useFileEntryQuery, useFileEntryLazyQuery } from '~/graphql'
import Konva from 'konva'
import { Stage, Layer, Image } from 'react-konva'
import { KonvaEventObject } from 'konva/types/Node'
import useImage from 'use-image'
import { Line } from 'konva/types/shapes/Line'
import { Dimension } from './types'

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
        points: [pos.x, pos.y],
      })
      layerRef.current.add(lastLine.current)
    },
    [stageRef, layerRef, mode]
  )

  const draw = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (!stageRef.current || !isDrawing || !lastLine.current) return

      const pos = stageRef.current?.getStage().getPointerPosition()
      if (!pos) return

      const newPoints = lastLine.current.points().concat([pos.x, pos.y])
      lastLine.current.points(newPoints)
      layerRef.current?.batchDraw()
    },
    [isDrawing]
  )

  const stopDrawing = useCallback(() => setIsDrawing(false), [])

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
            width={dimension.width}
            height={dimension.height}
            ref={stageRef}
          >
            <Layer>
              <Image image={image} />
            </Layer>
            <Layer ref={layerRef} />
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
