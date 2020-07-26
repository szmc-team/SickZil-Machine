/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Position2D } from './draw'
import { useEditorState } from '~/store/modules/editor'
import { useFileEntryQuery, useFileEntryLazyQuery } from '~/graphql'
import Konva from 'konva'
import { Stage, Layer, Image } from 'react-konva'
import { KonvaEventObject } from 'konva/types/Node'
import useImage from 'use-image'
import { Line } from 'konva/types/shapes/Line'

const Editor: React.FC = () => {
  const { fileEntryId } = useEditorState()
  const [loadFileEntry, { data }] = useFileEntryLazyQuery()

  useEffect(() => {
    if (fileEntryId) loadFileEntry({ variables: { id: fileEntryId } })
  }, [loadFileEntry, fileEntryId])

  const img = data?.fileEntry?.url
  const [image] = useImage(img || '')

  const [dimension, setDemension] = useState<{ width: number; height: number }>(
    { width: image?.height || 0, height: image?.height || 0 }
  )

  console.log(image)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  const [rect, setRect] = useState<DOMRect | null>(null)

  const lastLine = useRef<Line>()

  const stageRef = useRef<Stage>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const layerRef = useRef<Konva.Layer>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    setRect(canvasRef.current.getBoundingClientRect())
    setContext(canvasRef.current.getContext('2d'))
  }, [img])

  const startDrawing = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (!stageRef.current || !layerRef.current) return
      setIsDrawing(true)
      const pos = stageRef.current.getStage().getPointerPosition()
      if (!pos) return

      lastLine.current = new Konva.Line({
        stroke: 'red',
        strokeWidth: 5,
        globalCompositeOperation: 'source-over',
        points: [pos.x, pos.y],
      })
      layerRef.current.add(lastLine.current)
    },
    [rect]
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
    [context, rect, isDrawing]
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
        <Stage
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          width={window.innerWidth}
          height={window.innerHeight}
          ref={stageRef}
        >
          <Layer x={123}>
            <Image image={image} />
          </Layer>
          <Layer ref={layerRef} />
        </Stage>
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
