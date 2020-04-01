import { EditorActions } from '.'
import { Epic } from 'redux-observable'
import { NEVER } from 'rxjs'

export const editorEpic: Epic<EditorActions, EditorActions> = action$ => {
  return NEVER
}
