import React from 'react'
import ReactDOM from 'react-dom'
import { SnackbarProvider } from 'notistack'
import App from './features/app'
import * as serviceWorker from './serviceWorker'
import 'typeface-roboto'
import { GlobalStyle, ThemeProvider } from './styles'

const Root: React.FC = () => (
  <SnackbarProvider>
    <ThemeProvider>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </SnackbarProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'))

serviceWorker.unregister()
