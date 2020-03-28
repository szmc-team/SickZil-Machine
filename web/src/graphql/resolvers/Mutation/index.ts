import { MutationCreateFileArgs } from '../../operations'
import { ResolverContext } from '../../types'
import { v4 } from 'uuid'

export async function createFile(
  _: void,
  { input: { file } }: MutationCreateFileArgs,
  { fileManager }: ResolverContext
) {
  // const id = v4()
  const id = 'I love you'
  await fileManager.saveFile(file, id)
  return id
}
