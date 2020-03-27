/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import ActivityBar from '../activity-bar'
import Editor from '../editor'
import StatusBar from '../status-bar'

const App: React.FC = () => {
  return (
    <div css={styles.app}>
      <div css={styles.row}>
        <div css={styles.activityBarWrapper}>
          <ActivityBar />
        </div>
        <Editor />
      </div>
      <StatusBar />
    </div>
  )
}

const styles = {
  app: css`
    width: 100vw;
    height: 100vh;
    color: var(--text-color);
    background-color: var(--bg-color);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  activityBarWrapper: css`
    flex-shrink: 0;
  `,
  row: css`
    display: flex;
    flex-direction: row;
    height: 100%;
  `,
}
export default App
