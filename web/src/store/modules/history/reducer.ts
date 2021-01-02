import produce from 'immer'
import { createReducer } from 'typesafe-actions'
import { HistoryActions } from '.'
import { initializeImage, undo, redo, record } from './actions'
import { HistoryObject } from './types'

export interface HistoryState {
  [fileEntryId: string]: HistoryObject
}

const initialState: HistoryState = {}

export const historyReducer = createReducer<HistoryState, HistoryActions>(
  initialState
)
  .handleAction(initializeImage, (state, { payload: { fileEntryId } }) =>
    produce(state, draft => {
      draft[fileEntryId] = {
        lastAction: 'initialize',
        past: [],
        present: null,
        future: [],
      }
    })
  )
  .handleAction(undo, (state, { payload: { fileEntryId } }) =>
    produce(state, draft => {
      const fileHistoryObject = draft[fileEntryId]
      if (!fileHistoryObject.present) return

      fileHistoryObject.future.unshift(fileHistoryObject.present)
      fileHistoryObject.present = fileHistoryObject.past.pop() || null
      fileHistoryObject.lastAction = 'undo'
    })
  )
  .handleAction(redo, (state, { payload: { fileEntryId } }) =>
    produce(state, draft => {
      const fileHistoryObject = draft[fileEntryId]

      if (!fileHistoryObject.future.length) return
      if (fileHistoryObject.present)
        fileHistoryObject.past.push(fileHistoryObject.present)
      fileHistoryObject.present = fileHistoryObject.future.shift()!
      fileHistoryObject.lastAction = 'redo'
    })
  )
  .handleAction(record, (state, { payload: { fileEntryId, data, type } }) =>
    produce(state, draft => {
      const fileHistoryObject = draft[fileEntryId]

      if (fileHistoryObject.present)
        fileHistoryObject.past.push(fileHistoryObject.present)

      fileHistoryObject.future = []

      fileHistoryObject.present = {
        type,
        data,
      }
      fileHistoryObject.lastAction = 'record'
    })
  )
