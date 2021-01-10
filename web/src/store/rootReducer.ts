import { combineReducers } from 'redux'
import { editorReducer } from './modules/editor'
import { historyReducer } from './modules/history'

const rootReducer = combineReducers({
  editor: editorReducer,
  history: historyReducer,
})

export default rootReducer
