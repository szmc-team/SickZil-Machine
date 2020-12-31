export type HistoryType = 'draw'

type HistoryData = {
  type: HistoryType
  data: string
}

export type HistoryObject = {
  past: HistoryData[]
  present: HistoryData | null
  future: HistoryData[]
}
