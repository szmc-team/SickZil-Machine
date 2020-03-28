import React from 'react'
import ReactDOM from 'react-dom'
import { MemoryRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'
import App from './features/app'
import * as serviceWorker from './serviceWorker'
import 'typeface-roboto'
import { GlobalStyle, ThemeProvider } from './styles'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './stores/configureStores'

const store = createStore(rootReducer)

const Root: React.FC = () => (
  <Provider store={store}>
    <MemoryRouter>
      <SnackbarProvider>
        <ThemeProvider>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </SnackbarProvider>
    </MemoryRouter>
  </Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'))

serviceWorker.unregister()
