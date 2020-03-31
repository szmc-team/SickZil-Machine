/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import Editor from '../editor'
import StatusBar from '../status-bar'
import MenuBar from '../menu-bar'
import Explorer from '../explorer'

const App: React.FC = () => {
  return (
    <div css={styles.wrapper}>
      <div css={styles.app}>
        <MenuBar />
        <div css={styles.row}>
          <Editor />
          <div css={styles.activityBarWrapper}>
            <Explorer />
          </div>
        </div>
        <StatusBar />
      </div>
    </div>
  )
}

const styles = {
  wrapper: css`
    width: 100vw;
    height: 100vh;
  `,
  app: css`
    width: 100%;
    height: 100%;
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
    overflow: hidden;
  `,
}
export default App
