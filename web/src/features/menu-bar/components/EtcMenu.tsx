/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { FaGithub } from 'react-icons/fa'
import { useCallback } from 'react'
import { GITHUB_LINK } from '~/contants'

const EtcMenu: React.FC = () => {
  const openGithub = useCallback(() => window.open(GITHUB_LINK), [])

  return (
    <div css={styles.etcMenu}>
      <FaGithub css={styles.icon} size={32} onClick={openGithub} />
    </div>
  )
}

const styles = {
  etcMenu: css`
    display: flex;
    justify-content: flex-end;
  `,
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
