/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { MdBrush, MdUndo, MdRedo, MdTranslate } from 'react-icons/md'

const EditorMenu: React.FC = () => {
  return (
    <div css={styles.editorMenu}>
      <MdBrush css={styles.icon} size={24} />
      <MdTranslate css={styles.icon} size={24} />
      <MdUndo css={styles.icon} size={24} />
      <MdRedo css={styles.icon} size={24} />
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
