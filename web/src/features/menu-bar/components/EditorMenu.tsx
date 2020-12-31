/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { MdBrush, MdUndo, MdRedo, MdTranslate } from 'react-icons/md'
import { FaEraser } from 'react-icons/fa'
import { useEditor, useEditorState } from '~/store/modules/editor'
import { useHistory } from '~/store/modules/history'

const EditorMenu: React.FC = () => {
  const editor = useEditor()
  const { fileEntryId } = useEditorState()
  const history = useHistory()

  return (
    <div css={styles.editorMenu}>
      <MdBrush
        css={styles.icon}
        size={24}
        onClick={() => editor.changeMode('draw')}
      />
      <FaEraser
        css={styles.icon}
        size={24}
        onClick={() => editor.changeMode('erase')}
      />
      <MdTranslate css={styles.icon} size={24} />
      <MdUndo
        css={styles.icon}
        size={24}
        onClick={() => {
          if (fileEntryId) history.undo(fileEntryId)
        }}
      />
      <MdRedo
        css={styles.icon}
        size={24}
        onClick={() => {
          if (fileEntryId) history.redo(fileEntryId)
        }}
      />
    </div>
  )
}

const styles = {
  editorMenu: css`
    display: flex;
    flex: 1;
    justify-content: center;
  `,
  icon: css`
    margin: 12px;
    cursor: pointer;
    transition: color 100ms ease;
    &:hover {
      color: white;
    }
  `,
}

export default EditorMenu
