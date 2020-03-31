import { createAction } from 'typesafe-actions'

interface FileParams {
  file: string
}

interface ModeParams {
  mode: string
}

export const file = createAction('global/file')<FileParams>()
export const mode = createAction('global/mode')<ModeParams>()
