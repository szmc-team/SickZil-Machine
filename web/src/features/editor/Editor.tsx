/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useState, useEffect, useRef } from 'react'
import { drawLine, Position2D } from './draw'

let timer: NodeJS.Timeout | null

const Editor: React.FC = () => {
  const [img, setImg] = useState<string>('')
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  const [rect, setRect] = useState<DOMRect>()

  const prev = useRef<Position2D>({ x: 0, y: 0 })
  const curr = useRef<Position2D>({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      setContext(canvasRef.current.getContext('2d'))
      setRect(canvasRef.current.getBoundingClientRect())
    }
  }, [canvasRef.current])

  const handleMouseDown = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (e.button) return
    setIsDrawing(true)

    if (!rect) return
    const { clientX, clientY } = e
    prev.current = {
      x: clientX - rect.left,
      y: clientY - rect.top,
    }
    curr.current = {
      x: clientX - rect.left,
      y: clientY - rect.top,
    }
  }

  const handleMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    e.persist()
    if (!rect) return

    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        if (context && isDrawing) {
          prev.current = curr.current
          curr.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          }

          drawLine(context, prev.current, curr.current)
        }
      }, 16)
    }
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
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
        {img === '' ? (
          <input
            type="file"
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
          />
          {img === '' ? null : (
            <canvas
              css={css`
                position: absolute;
                z-index: 2;
              `}
              ref={canvasRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              width={imageRef.current ? imageRef.current.width : 0}
              height={imageRef.current ? imageRef.current.height : 0}
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
    background-color: green;
    overflow: hidden;
  `,
}

export default Editor
