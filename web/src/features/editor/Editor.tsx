/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useState, useEffect, useRef, useCallback } from 'react'
import { drawLine, Position2D } from './draw'

const Editor: React.FC = () => {
  const [img, setImg] = useState<string>('')
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
    (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      if (e.button || !rect) return
      setIsDrawing(true)
      const { clientX, clientY } = e
      prev.current = { x: clientX - rect.left, y: clientY - rect.top }
      curr.current = { x: clientX - rect.left, y: clientY - rect.top }
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
        {img === '' ? (
          <input
            type="file"
            aria-label="editor_input"
            accept="image/*"
            css={css`
              display: none;
            `}
            onChange={e => {
              const file = e.target.files?.[0]
              if (!file) return

              const fileReader = new FileReader()
              fileReader.addEventListener('load', event => {
                setImg((event.target?.result as string) ?? null)
              })
              fileReader.readAsDataURL(file)
            }}
          />
        ) : null}
        <div
          css={css`
            position: relative;
            width: 100%;
            height: 100%;
            object-fit: contain;
          `}
        >
          <img
            css={css`
              width: 100%;
              height: 100%;
              object-fit: contain;
              position: absolute;
              z-index: 1;
            `}
            src={img}
            ref={imageRef}
            alt="Image not found"
          />
          {img === '' ? null : (
            <canvas
              css={css`
                position: absolute;
                z-index: 2;
              `}
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              width={imageRef.current?.width ?? 0}
              height={imageRef.current?.height ?? 0}
            />
          )}
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
