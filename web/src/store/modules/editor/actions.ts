import { createAction } from 'typesafe-actions'
import { EditMode } from './types'

type SelectFileParams = { fileEntryId: string }
export const selectFile = createAction('editor/SELECT_FILE')<SelectFileParams>()

type RemoveFileParams = { fileEntryId: string }
export const removeFile = createAction('editor/REMOVE_FILE')<RemoveFileParams>()

export const close = createAction('editor/CLOSE')()

type ChangeModeParams = { mode: EditMode }
export const changeMode = createAction('editor/CHANGE_MODE')<ChangeModeParams>()

type MagnifyParams = { ratio: number }
export const magnify = createAction('editor/MAGNIFY')<MagnifyParams>()

type InitEditorParams = { canvas: HTMLCanvasElement }
export const initEditor = createAction('editor/INIT_EDITOR')<InitEditorParams>()
