/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const StatusBar: React.FC = () => {
  return <div css={styles.statusBar}>HELLO HELLO</div>
}

const styles = {
  statusBar: css`
    background-color: blue;
    color: white;
    font-weight: 900;
    padding: 6px;
  `,
}

export default StatusBar
