import { createReducer } from 'typesafe-actions'
import { EditorActions } from '.'
import { changeMode, close, removeFile, selectFile } from './actions'

export interface EditorState {
  targetFileEntryId: string | null
  mode: 'draw' | 'erase'
}

const initialState: EditorState = {
  targetFileEntryId: null,
  mode: 'draw',
}

export const editorReducer = createReducer<EditorState, EditorActions>(
  initialState
)
  .handleAction(changeMode, state => state)
  .handleAction(close, state => state)
  .handleAction(removeFile, state => state)
  .handleAction(selectFile, state => state)
