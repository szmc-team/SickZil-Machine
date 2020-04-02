import { createReducer } from 'typesafe-actions'
import { produce } from 'immer'
import { EditorActions } from '.'
import { changeMode, close, removeFile, selectFile } from './actions'
import { EditMode } from './types'

export interface EditorState {
  fileEntryId: string | null
  mode: EditMode
}

const initialState: EditorState = {
  fileEntryId: null,
  mode: 'draw',
}

export const editorReducer = createReducer<EditorState, EditorActions>(
  initialState
)
  .handleAction(changeMode, (state, { payload: { mode } }) =>
    produce(state, draft => {
      draft.mode = mode
    })
  )
  .handleAction(close, state => state)
  .handleAction(removeFile, state => state)
  .handleAction(selectFile, (state, { payload: { fileEntryId } }) =>
    produce(state, draft => {
      draft.fileEntryId = fileEntryId
    })
  )
