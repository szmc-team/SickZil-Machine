/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useState, useEffect, useRef, useCallback } from 'react'
import { drawLine, Position2D } from './draw'
import { useEditorState } from '~/store/modules/editor'
import { useFileEntryQuery, useFileEntryLazyQuery } from '~/graphql'
import Konva from 'konva'
import { Stage, Layer } from 'react-konva'
import { KonvaEventObject } from 'konva/types/Node'

const Editor: React.FC = () => {
  const { fileEntryId } = useEditorState()
  const [loadFileEntry, { data }] = useFileEntryLazyQuery()

  useEffect(() => {
    if (fileEntryId) loadFileEntry({ variables: { id: fileEntryId } })
  }, [loadFileEntry, fileEntryId])

  const img = data?.fileEntry?.url

  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  const [rect, setRect] = useState<DOMRect | null>(null)

  const prev = useRef<Position2D>({ x: 0, y: 0 })
  const curr = useRef<Position2D>({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    setRect(canvasRef.current.getBoundingClientRect())
    setContext(canvasRef.current.getContext('2d'))
  }, [img])

  const startDrawing = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      // if (e.button || !rect) return
      // setIsDrawing(true)
      // const { clientX, clientY } = e
      // prev.current = { x: clientX - rect.left, y: clientY - rect.top }
      // curr.current = { x: clientX - rect.left, y: clientY - rect.top }
      const stage = e.target.getStage()
      if (!stage) return
      const pos = stage.getPointerPosition()
      if (!pos) return
      const lastLine = new Konva.Line({
        stroke: 'red',
        strokeWidth: 5,
        globalCompositeOperation: 'source-over',
        points: [pos.x, pos.y],
      })
      e.currentTarget.getLayer()?.add(lastLine)
    },
    [rect]
  )

  const draw = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      e.persist()
      if (!rect) return

      if (context && isDrawing) {
        prev.current = curr.current
        curr.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }

        drawLine(context, prev.current, curr.current)
      }
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
          width={window.innerWidth}
          height={window.innerHeight}
        >
          <Layer></Layer>
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
