import { QueryFileArgs } from '../../operations'
import { ref } from '../ref'

export function file(_: void, { id }: QueryFileArgs) {
  return ref.file
}
