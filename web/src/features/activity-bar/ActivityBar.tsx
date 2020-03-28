/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import Explorer from './components/explorer'

const ActivityBar: React.FC = () => {
  return (
    <div css={styles.activityBar}>
      <Explorer />
    </div>
  )
}

const styles = {
  activityBar: css`
    width: 240px;
    background-color: var(--bg-color);
    color: var(--text-color);
  `,
}

export default ActivityBar
