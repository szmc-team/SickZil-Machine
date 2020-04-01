import { combineReducers } from 'redux'
import { editorReducer } from './modules/editor'

const rootReducer = combineReducers({
  editor: editorReducer,
})

export default rootReducer
