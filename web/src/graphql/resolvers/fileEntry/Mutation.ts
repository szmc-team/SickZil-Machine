import { MutationCreateFileEntryArgs } from '../../operations'
import { ResolverContext } from '../../types'

export async function createFileEntry(
  _: void,
  { input: { file } }: MutationCreateFileEntryArgs,
  { fileManager }: ResolverContext
) {
  const id = await fileManager.create(file)
  return id
}
