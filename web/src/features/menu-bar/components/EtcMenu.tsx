/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { FaGithub } from 'react-icons/fa'

const EtcMenu: React.FC = () => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: flex-end;
      `}
    >
      <FaGithub css={styles.icon} size={32} />
    </div>
  )
}

const styles = {
  icon: css`
    margin: 12px;
    cursor: pointer;
    transition: color 100ms ease;
    &:hover {
      color: white;
    }
  `,
}

export default EtcMenu
