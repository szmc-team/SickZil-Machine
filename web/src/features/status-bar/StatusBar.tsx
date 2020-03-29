/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const StatusBar: React.FC = () => {
  return <div css={styles.statusBar}>Idle</div>
}

const styles = {
  statusBar: css`
    background-color: rgb(0, 120, 210);
    color: white;
    font-weight: 700;
    padding: 6px 24px;
  `,
}

export default StatusBar
