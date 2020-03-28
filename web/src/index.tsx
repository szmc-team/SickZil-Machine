import React from 'react'
import ReactDOM from 'react-dom'
import { MemoryRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import App from './features/app'
import * as serviceWorker from './serviceWorker'
import 'typeface-roboto'
import { GlobalStyle, ThemeProvider } from './styles'

const Root: React.FC = () => (
  <MemoryRouter>
    <SnackbarProvider>
      <ThemeProvider>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </SnackbarProvider>
  </MemoryRouter>
)

ReactDOM.render(<Root />, document.getElementById('root'))

serviceWorker.unregister()
