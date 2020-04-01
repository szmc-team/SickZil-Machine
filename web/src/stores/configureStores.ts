import { createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import rootEpic from './rootEpic'
import rootReducer from './rootReducer'

export function configureStore() {
  const epicMiddleware = createEpicMiddleware()
  const store = createStore(rootReducer)
  epicMiddleware.run(rootEpic)

  return store
}
