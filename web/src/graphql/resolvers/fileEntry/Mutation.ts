import {
  MutationCreateFileEntryArgs,
  MutationDeleteFileEntryArgs,
  ResolverContext,
} from '~/graphql'

export async function createFileEntry(
  _: void,
  { input: { file } }: MutationCreateFileEntryArgs,
  { fileManager }: ResolverContext
) {
  const id = await fileManager.create(file)
  return id
}

export async function deleteFileEntry(
  _: void,
  { input: { id } }: MutationDeleteFileEntryArgs,
  { fileManager }: ResolverContext
) {
  await fileManager.delete(id)
  return true
}
