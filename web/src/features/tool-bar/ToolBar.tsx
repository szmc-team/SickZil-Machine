/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const ToolBar: React.FC = () => {
  return (
    <div css={styles.statusBar}>
      <ul
        css={css`
          display: flex;
          flex-direction: row;
          padding: 0;
          margin: 0;
          list-style-type: none;

          & > li {
            margin: 0 12px;
          }
        `}
      >
        <li>ADD IMAGE</li>
        <li>ADD MASK</li>
      </ul>
    </div>
  )
}

const styles = {
  statusBar: css`
    background-color: pink;
    color: white;
    font-weight: 900;
    padding: 6px;
  `,
}

export default ToolBar
