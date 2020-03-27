/** @jsx jsx */
import { jsx, Global, css } from '@emotion/core'

export const GlobalStyle = () => (
  <Global styles={[styles.master, styles.themeScheme]} />
)

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
  themeScheme: css`
    :root {
      --bg-color: white;
      --text-color: black;
    }

    .dark {
      --bg-color: black;
      --text-color: white;
    }
  `,
}
