/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const ApplicationMenu: React.FC = () => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: flex-start;
      `}
    >
      <span css={styles.menuItem}>여기에 로고 입력</span>
      <span css={styles.menuItem}>File</span>
      <span css={styles.menuItem}>Edit</span>
    </div>
  )
}

const styles = {
  menu: css`
    margin: 0 6px;
  `,
  menuItem: css`
    margin: 0 12px;
    cursor: pointer;
    &:hover {
      color: white;
    }
  `,
}

export default ApplicationMenu
