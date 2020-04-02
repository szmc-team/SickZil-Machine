import { combineEpics } from 'redux-observable'
import { editorEpic } from './modules/editor'

const rootEpic = combineEpics(editorEpic)

export default rootEpic
