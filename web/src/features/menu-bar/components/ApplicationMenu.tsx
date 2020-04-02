/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useCreateFileEntryMutation, FileEntriesDocument } from '~/graphql'

const ApplicationMenu: React.FC = () => {
  const [createFileEntryMutation] = useCreateFileEntryMutation({
    refetchQueries: [{ query: FileEntriesDocument }],
    awaitRefetchQueries: true,
  })
  return (
    <div css={styles.applicationMenu}>
      <span css={styles.menuItem}>여기에 로고 입력</span>
      <label>
        <span css={styles.menuItem}>File</span>
        <input
          data-cy="FileInput"
          type="file"
          accept="image/*"
          css={css`
            display: none;
          `}
          onChange={async e => {
            const file = e.target.files?.[0]
            if (!file) return
            await createFileEntryMutation({ variables: { input: { file } } })
          }}
        />
      </label>
      <span css={styles.menuItem}>Edit</span>
    </div>
  )
}

const styles = {
  applicationMenu: css`
    display: flex;
    flex: 1;
    justify-content: flex-start;
  `,
  menuItem: css`
    margin: 0 12px;
    cursor: pointer;
    &:hover {
      color: white;
    }
  `,
}

export default ApplicationMenu
