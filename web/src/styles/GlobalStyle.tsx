/** @jsx jsx */
import { jsx, Global, css } from '@emotion/core'

export const GlobalStyle = () => <Global styles={styles.master} />

const styles = {
  master: css`
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
        'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
        'Helvetica Neue', sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }
  `,
}
