/** @jsx jsx */
import { useState, useEffect } from 'react'
import { jsx, css } from '@emotion/core'
import { useFileEntriesQuery } from '~/graphql'
import ImageList from './ImageList'
import ImageListItem from './ImageListItem'
import { FilePreview } from './types'

const Explorer: React.FC = () => {
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
    <div css={styles.explorer}>
      <ImageList>
        {items.map(({ id, name, img }) => (
          <ImageListItem key={id} id={id} name={name} img={img} />
        ))}
      </ImageList>
    </div>
  )
}

const styles = {
  explorer: css`
    display: flex;
    flex-direction: column;
    background-color: rgb(56, 56, 56);
    color: white;
    width: 240px;
    height: 100%;
  `,
}

export default Explorer
