import { createReducer, ActionType } from 'typesafe-actions'
import * as globalActions from './actions'

type GlobalActions = ActionType<typeof globalActions>

interface GlobalState {
  file: string
  mode: string
}

const initialState: GlobalState = {
  file: '',
  mode: 'default',
}

export const globalReducer = createReducer<GlobalState, GlobalActions>(
  initialState
)
  .handleAction(globalActions.file, (state, { payload }) => ({
    ...state,
    file: payload.file,
  }))
  .handleAction(globalActions.mode, (state, { payload }) => ({
    ...state,
    mode: payload.mode,
  }))
