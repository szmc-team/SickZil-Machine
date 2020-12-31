import { useCallback, useMemo } from 'react'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { HistoryState } from './reducer'
import * as historyActions from './actions'

export function useHistory() {
  const dispatch = useDispatch()

  const undo = useCallback(
    (fileEntryId: string) => dispatch(historyActions.undo({ fileEntryId })),
    [dispatch]
  )

  const redo = useCallback(
    (fileEntryId: string) => dispatch(historyActions.redo({ fileEntryId })),
    [dispatch]
  )

  const draw = useCallback(
    (fileEntryId: string, data: string) =>
      dispatch(
        historyActions.record({
          fileEntryId,
          data,
          type: 'draw',
        })
      ),
    [dispatch]
  )

  const initialize = useCallback(
    (fileEntryId: string) =>
      dispatch(historyActions.initializeImage({ fileEntryId })),
    [dispatch]
  )

  return useMemo(() => ({ undo, redo, draw, initialize }), [
    undo,
    redo,
    draw,
    initialize,
  ])
}

export function useHistoryState(fileEntryId: string | null) {
  return useSelector(({ history }: { history: HistoryState }) => {
    if (!fileEntryId) {
      return undefined
    }
    return history[fileEntryId]
  }, shallowEqual)
}
