/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import Menu from './components/menu'

const ActivityBar: React.FC = () => {
  return (
    <div css={styles.activityBar}>
      <Menu />
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
