/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { hacker } from 'faker'
import {
  useCreateFileMutation,
  FileDocument,
  useFileQuery,
} from '../../../../graphql'
import { useState, useEffect } from 'react'

const Explorer: React.FC = () => {
  const [createFileMutation] = useCreateFileMutation()
  const { data } = useFileQuery({ variables: { id: '111' } })
  const [img, setImg] = useState('')

  useEffect(() => {
    const file = data?.file
    if (!file) return

    const fileReader = new FileReader()

    fileReader.addEventListener('load', event => {
      const img = event.target?.result
      if (typeof img === 'string') setImg(img)
    })

    fileReader.readAsDataURL(file)
  }, [data])

  return (
    <div css={styles.activityBar}>
      <img
        src={img}
        css={css`
          width: 160px;
          height: 160px;
          object-fit: contain;
        `}
      />
      <input
        type="file"
        accept="image/*"
        onChange={async e => {
          const file = e.target.files?.[0]
          if (!file) return
          await createFileMutation({
            variables: { input: { file } },
            refetchQueries: [{ query: FileDocument, variables: { id: '111' } }],
            awaitRefetchQueries: true,
          })
        }}
      />
      <ul
        css={css`
          display: flex;
          flex-direction: column;
          padding: 0;
          margin: 0;
          list-style-type: none;
        `}
      >
        {Array.from({ length: 12 })
          .map((_, idx) => ({
            id: idx,
            value: hacker.abbreviation(),
          }))
          .map(({ id, value }) => (
            <li
              key={id}
              css={css`
                padding: 6px 12px;
              `}
            >
              {value}
            </li>
          ))}
      </ul>
    </div>
  )
}

const styles = {
  activityBar: css`
    width: 240px;
    background-color: var(--bg-color);
    color: var(--text-color);
  `,
}

export default Explorer
