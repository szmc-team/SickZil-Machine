import { FileManager } from './FileManager'

window.requestFileSystem =
  window.requestFileSystem ?? window.webkitRequestFileSystem

export async function configureFileSystem(diskSize: number) {
  await new Promise<number>((res, rej) =>
    navigator.webkitPersistentStorage.requestQuota(diskSize, res, rej)
  )
  const fileSystem = await new Promise<FileSystem>((res, rej) =>
    window.requestFileSystem(window.PERSISTENT, 1024 * 1024 * 1024, res, rej)
  )

  return new FileManager(fileSystem)
}
