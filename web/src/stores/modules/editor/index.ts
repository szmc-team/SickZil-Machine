export * from './actions'
export * from './epic'
export * from './hooks'
export * from './reducer'

import * as editorActions from './actions'
import { ActionType } from 'typesafe-actions'

export type EditorActions = ActionType<typeof editorActions>
