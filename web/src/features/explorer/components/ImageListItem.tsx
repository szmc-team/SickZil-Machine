/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useDeleteFileEntryMutation, FileEntriesDocument } from '~/graphql'
import { FilePreview } from '../types'
import { useEditor } from '~/store/modules/editor'

interface ImageListItemProps extends FilePreview {}

const ImageListItem: React.FC<ImageListItemProps> = ({ id, img, name }) => {
  const editor = useEditor()
  const [deleteFileEntry] = useDeleteFileEntryMutation({
    refetchQueries: [{ query: FileEntriesDocument }],
    awaitRefetchQueries: true,
  })

  return (
    <li
      data-cy="ImageListItem"
      css={styles.item}
      onClick={() => editor.selectFile(id)}
    >
      <img src={img} css={styles.img} alt="" />
      <div>
        <span css={styles.name}>{name}</span>
        <button
          data-cy="ImageListItem__deleteButton"
          onClick={() => deleteFileEntry({ variables: { input: { id } } })}
        >
          DELETE
        </button>
      </div>
    </li>
  )
}

const styles = {
  item: css`
    cursor: pointer;
    padding: 6px 12px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;

    margin: 6px 0;
    transition: background-color 100ms ease;
    &:hover {
      background-color: rgb(32, 32, 32);
    }
  `,
  img: css`
    background-color: gray;
    width: 48px;
    height: 48px;
    object-fit: contain;
  `,
  name: css`
    margin-top: 6px;
    margin-left: 12px;
    font-size: 12px;
  `,
}

export default ImageListItem
