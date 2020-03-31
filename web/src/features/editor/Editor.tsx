/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useState } from 'react'
import { subject } from '../explorer/components/ImageListItem'
import { useFileEntryQuery } from '~/graphql'

const Editor: React.FC = () => {
  const [imgId, setImgId] = useState<string>('')

  const { data: fileEntryData } = useFileEntryQuery({
    variables: {
      id: imgId,
    },
  })
  const fileEntry = fileEntryData?.fileEntry

  subject.subscribe({
    next: (v: String) => {
      setImgId(v as string)
    },
  })

  return (
    <div css={styles.editor}>
      <label
        css={css`
          display: block;
          width: 100%;
          height: 100%;
        `}
      >
        <img
          css={css`
            width: 100%;
            height: 100%;
            object-fit: contain;
          `}
          src={fileEntry?.url}
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
