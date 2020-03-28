import { ResolverContext } from '../../types'
import { QueryFileArgs } from '../../operations'

export async function file(
  _: void,
  { id }: QueryFileArgs,
  { fileManager }: ResolverContext
) {
  const _id = 'I love you'
  const file = await fileManager.readFile(_id)
  return file && new Blob([file])
}
