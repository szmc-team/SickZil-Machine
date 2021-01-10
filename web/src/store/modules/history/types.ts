export type HistoryType = 'draw'

export type Action = 'undo' | 'redo' | 'record' | 'initialize' | 'none'

type HistoryData = {
  type: HistoryType
  data: {
    points: number[]
    stroke: string
    strokeWidth: number
  }
}

export type HistoryObject = {
  lastAction: Action
  past: HistoryData[]
  present: HistoryData | null
  future: HistoryData[]
}
