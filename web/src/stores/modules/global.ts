const FILE = 'global/files'
const MODE = 'global/mode'

export const file = () => ({ type: FILE })
export const mode = () => ({ type: MODE })

const initialState = {
  file: '',
  mode: 'none',
}

export default function global(
  state = initialState,
  action: { type: any; file: any; mode: any }
) {
  switch (action.type) {
    case FILE:
      return {
        ...state,
        file: action.file,
      }
    case MODE:
      return {
        ...state,
        mode: action.mode,
      }
    default:
      return state
  }
}
