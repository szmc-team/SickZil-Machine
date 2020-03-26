/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const Explorer: React.FC = () => {
  return <div css={styles.activityBar}></div>
}

const styles = {
  activityBar: css`
    width: 240px;
    background-color: var(--bg-color);
    color: var(--text-color);
  `,
}

export default Explorer
