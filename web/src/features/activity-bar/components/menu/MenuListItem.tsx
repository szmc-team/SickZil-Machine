/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const MenuListItem: React.FC = ({ children }) => {
  return <li css={styles.item}>{children}</li>
}

const styles = {
  item: css`
    padding: 6px 12px;
  `,
}

export default MenuListItem
