import * as historyActions from './actions'
import { ActionType } from 'typesafe-actions'

export * from './actions'
export * from './hooks'
export * from './reducer'
export * from './types'

export type HistoryActions = ActionType<typeof historyActions>
