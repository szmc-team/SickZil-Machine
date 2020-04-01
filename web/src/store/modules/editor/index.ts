import * as editorActions from './actions'
import { ActionType } from 'typesafe-actions'

export * from './actions'
export * from './epic'
export * from './hooks'
export * from './reducer'
export * from './types'

export type EditorActions = ActionType<typeof editorActions>
