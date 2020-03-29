import { MutationCreateFileEntryArgs, ResolverContext } from '~/graphql'

export async function createFileEntry(
  _: void,
  { input: { file } }: MutationCreateFileEntryArgs,
  { fileManager }: ResolverContext
) {
  const id = await fileManager.create(file)
  return id
}
