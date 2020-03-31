import React from 'react'
import ReactDOM from 'react-dom'
import { MemoryRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import 'typeface-roboto'
import { ApolloProvider } from '@apollo/client'
import App from './features/app'
import * as serviceWorker from './serviceWorker'
import { GlobalStyle, ThemeProvider } from './styles'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './stores/configureStores'
import { configureClient } from './graphql'

const store = createStore(rootReducer)
const client = configureClient()

const Root: React.FC = () => (
  <Provider store={store}>
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
  </Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'))

serviceWorker.unregister()
