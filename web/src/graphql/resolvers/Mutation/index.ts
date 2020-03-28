import { MutationCreateFileArgs } from '../../operations'
import { ResolverContext } from '../../types'

export async function createFile(
  _: void,
  { input: { file } }: MutationCreateFileArgs,
  { fileManager }: ResolverContext
) {
  await fileManager.saveFile(file, '1.file')

  return ''
}
