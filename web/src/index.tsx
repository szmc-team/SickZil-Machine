import React from 'react'
import ReactDOM from 'react-dom'
import { MemoryRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import App from './features/app'
import * as serviceWorker from './serviceWorker'
import 'typeface-roboto'
import { GlobalStyle, ThemeProvider } from './styles'
import { ApolloProvider } from '@apollo/client'
import { configureClient } from './graphql'

const client = configureClient()

const Root: React.FC = () => (
  <ApolloProvider client={client}>
    <MemoryRouter>
      <SnackbarProvider>
        <ThemeProvider>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </SnackbarProvider>
    </MemoryRouter>
  </ApolloProvider>
)

ReactDOM.render(<Root />, document.getElementById('root'))

serviceWorker.unregister()
