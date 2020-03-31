/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useState } from 'react'

const Editor: React.FC = () => {
  const [img, setImg] = useState<string>('')

  return (
    <div css={styles.editor}>
      <label
        css={css`
          display: block;
          width: 100%;
          height: 100%;
        `}
      >
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
        <img
          css={css`
            width: 100%;
            height: 100%;
            object-fit: contain;
          `}
          src={img}
        />
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
