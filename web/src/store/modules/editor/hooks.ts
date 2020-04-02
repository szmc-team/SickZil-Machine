import { useMemo, useCallback } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import * as editorActions from './actions'
import { EditorState } from './reducer'
import { EditMode } from './types'

export function useEditor() {
  const dispatch = useDispatch()

  const changeMode = useCallback(
    (mode: EditMode) => dispatch(editorActions.changeMode({ mode })),
    [dispatch]
  )

  const selectFile = useCallback(
    (id: string) => dispatch(editorActions.selectFile({ fileEntryId: id })),
    [dispatch]
  )

  return useMemo(() => ({ changeMode, selectFile }), [changeMode, selectFile])
}

export function useEditorState() {
  return useSelector(
    ({ editor }: { editor: EditorState }) => editor,
    shallowEqual
  )
}
