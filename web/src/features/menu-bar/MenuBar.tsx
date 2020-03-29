/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import ApplicationMenu from './components/ApplicationMenu'
import EditorMenu from './components/EditorMenu'
import EtcMenu from './components/EtcMenu'

const MenuBar: React.FC = () => {
  return (
    <header css={styles.menuBar}>
      <ApplicationMenu />
      <EditorMenu />
      <EtcMenu />
    </header>
  )
}

const styles = {
  menuBar: css`
    flex-shrink: 0;
    width: 100%;
    height: 48px;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
      0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    background-color: rgb(32, 32, 32);
    color: rgb(192, 192, 192);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 12px;
  `,
}

export default MenuBar
