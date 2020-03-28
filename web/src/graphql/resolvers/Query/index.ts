import { ResolverContext } from '../../types'
import { QueryFileArgs } from '../../operations'

export async function file(
  _: void,
  { id }: QueryFileArgs,
  { fileManager }: ResolverContext
) {
  const file = await fileManager.readFile('1.file')
  return file && new Blob([file])
}
