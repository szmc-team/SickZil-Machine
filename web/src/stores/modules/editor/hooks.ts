import { useMemo } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as editorActions from './actions'
import { EditorState } from './reducer'

export function useEditor() {
  const dispatch = useDispatch()
  return useMemo(() => bindActionCreators(editorActions, dispatch), [])
}

export function useCurrentFileEntryId() {
  return useSelector(({ editor }: { editor: EditorState }) => {
    return editor.targetFileEntryId
  }, shallowEqual)
}
