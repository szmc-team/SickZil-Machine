import { combineReducers } from 'redux'
import { globalReducer } from './modules/global'

const rootReducer = combineReducers({
  global: globalReducer,
})

export default rootReducer
