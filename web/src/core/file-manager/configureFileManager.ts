import { FileManager } from './FileManager'

window.requestFileSystem =
  window.requestFileSystem ?? window.webkitRequestFileSystem

export async function configureFileManager(diskSize: number) {
  await new Promise<number>((res, rej) =>
    navigator.webkitPersistentStorage.requestQuota(diskSize, res, rej)
  )

  const db = await new Promise<IDBDatabase>((res, rej) => {
    const request = indexedDB.open('hellox', 4)
    request.onupgradeneeded = e => {
      request.result.createObjectStore('img')
    }
    request.onerror = () => rej()
    request.onsuccess = () => res(request.result)
  })

  return new FileManager(db)
}
