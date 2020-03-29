/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import {
  useCreateFileEntryMutation,
  useFileEntriesQuery,
  FileEntriesDocument,
} from '~/graphql'
import { useState, useEffect } from 'react'
import ImageList from './ImageList'
import ImageListItem from './ImageListItem'
import { FilePreview } from './types'

const Explorer: React.FC = () => {
  const [createFileEntryMutation] = useCreateFileEntryMutation()
  const { data: fileEntriesData } = useFileEntriesQuery()
  const fileEntries = fileEntriesData?.fileEntries

  const [items, setItems] = useState<FilePreview[]>([])

  useEffect(() => {
    Promise.all(
      (fileEntries ?? []).map(
        ({ id, name, blob }) =>
          new Promise<FilePreview>(res => {
            const fileReader = new FileReader()

            fileReader.addEventListener('load', event =>
              res({ id, name, img: event.target!.result as string })
            )

            fileReader.readAsDataURL(blob)
          })
      )
    ).then(items => setItems(items))
  }, [fileEntries])

  return (
    <div css={styles.activityBar}>
      <input
        type="file"
        accept="image/*"
        onChange={async e => {
          const file = e.target.files?.[0]
          if (!file) return
          await createFileEntryMutation({
            variables: { input: { file } },
            refetchQueries: [{ query: FileEntriesDocument }],
            awaitRefetchQueries: true,
          })
        }}
      />
      <ImageList>
        {items.map(({ id, name, img }) => (
          <ImageListItem key={id} id={id} name={name} img={img} />
        ))}
      </ImageList>
    </div>
  )
}

const styles = {
  activityBar: css`
    display: flex;
    flex-direction: column;
    width: 240px;
    height: 100%;
    background-color: var(--bg-color);
    color: var(--text-color);
  `,
}

export default Explorer
