import { createAction } from 'typesafe-actions'
import { HistoryType } from './types'

type InitializeHistoryParams = { fileEntryId: string }
export const initializeImage = createAction('history/INITIALIZE_FILE_HISTORY')<
  InitializeHistoryParams
>()

type UndoHistoryParams = { fileEntryId: string }
export const undo = createAction('history/UNDO_HISTORY')<UndoHistoryParams>()

type RedoHistoryParams = { fileEntryId: string }
export const redo = createAction('history/REDO_HISTORY')<RedoHistoryParams>()

type RecordHistoryParams = {
  fileEntryId: string
  data: {
    points: number[]
    stroke: string
    strokeWidth: number
  }
  type: HistoryType
}
export const record = createAction('history/RECORD_HISTORY')<
  RecordHistoryParams
>()
