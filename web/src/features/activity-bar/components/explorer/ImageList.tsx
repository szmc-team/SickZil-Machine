/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const ImageList: React.FC = ({ children }) => {
  return <ul css={styles.list}>{children}</ul>
}

const styles = {
  list: css`
    height: 100%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;
    list-style-type: none;
  `,
}

export default ImageList
