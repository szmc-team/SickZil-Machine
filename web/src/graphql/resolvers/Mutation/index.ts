import { MutationCreateFileArgs } from '../../operations'
import { ref } from '../ref'
export function createFile(
  _: void,
  { input: { file } }: MutationCreateFileArgs
) {
  ref.file = file

  return 'key'
}
