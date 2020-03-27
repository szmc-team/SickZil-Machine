/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useRef, useEffect } from 'react'

const Editor: React.FC = () => {
  const elRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const ctx = elRef.current?.getContext('2d')
    console.log(ctx)
  }, [])

  return (
    <div css={styles.editor}>
      <canvas ref={elRef} />
    </div>
  )
}
const styles = {
  editor: css`
    width: 100%;
    background-color: green;
  `,
}

export default Editor
