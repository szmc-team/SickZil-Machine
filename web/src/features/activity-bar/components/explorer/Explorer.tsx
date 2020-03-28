/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { hacker } from 'faker'

const Explorer: React.FC = () => {
  return (
    <div css={styles.activityBar}>
      <ul
        css={css`
          display: flex;
          flex-direction: column;
          padding: 0;
          margin: 0;
          list-style-type: none;
        `}
      >
        {Array.from({ length: 12 })
          .map((_, idx) => ({
            id: idx,
            value: hacker.abbreviation(),
          }))
          .map(({ id, value }) => (
            <li
              key={id}
              css={css`
                padding: 6px 12px;
              `}
            >
              {value}
            </li>
          ))}
      </ul>
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

export default Explorer
