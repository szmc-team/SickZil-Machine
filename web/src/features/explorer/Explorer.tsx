/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useFileEntriesQuery } from '~/graphql'
import ImageList from './components/ImageList'
import ImageListItem from './components/ImageListItem'

const Explorer: React.FC = () => {
  const { data: fileEntriesData } = useFileEntriesQuery()
  const fileEntries = fileEntriesData?.fileEntries

  return (
    <div css={styles.explorer}>
      <ImageList>
        {fileEntries?.map(({ id, name, url }) => (
          <ImageListItem key={id} id={id} name={name} img={url} />
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
