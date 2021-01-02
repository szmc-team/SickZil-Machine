export type HistoryType = 'draw'

type HistoryData = {
  type: HistoryType
  data: string
}

export type HistoryObject = {
  lastAction: 'undo' | 'redo' | 'record' | 'initialize' | 'none'
  past: HistoryData[]
  present: HistoryData | null
  future: HistoryData[]
}
