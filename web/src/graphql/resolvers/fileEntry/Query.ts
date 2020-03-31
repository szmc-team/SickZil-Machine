import { ResolverContext, QueryFileEntryArgs } from '~/graphql'

export async function fileEntry(
  _: void,
  { id }: QueryFileEntryArgs,
  { fileManager }: ResolverContext
) {
  const fileEntry = await fileManager.read(id)
  return fileEntry
}

export async function fileEntries(
  _: void,
  __: void,
  { fileManager }: ResolverContext
) {
  const fileEntries = await fileManager.readAll()
  return fileEntries
}
