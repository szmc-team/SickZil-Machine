import localforage from 'localforage'

export class FileManager {
  async saveFile(file: File, name: string) {
    const arrayBuffer = await blobToArrayBuffer(file)
    await this.blobStorage.setItem(name, arrayBuffer)
  }

  async readFile(name: string) {
    return this.blobStorage.getItem<ArrayBuffer>(name).catch(() => null)
  }

  private blobStorage = localforage.createInstance({
    name: 'blob',
    driver: localforage.INDEXEDDB,
  })

  private metaStorage = localforage.createInstance({
    name: 'meta',
    driver: localforage.LOCALSTORAGE,
  })
}

async function blobToArrayBuffer(blob: Blob) {
  const fileReader = new FileReader()
  fileReader.readAsArrayBuffer(blob)

  return new Promise<ArrayBuffer>((res, rej) => {
    fileReader.onload = ({ target }) =>
      target ? res(target.result as ArrayBuffer) : rej()
    fileReader.onerror = rej
  })
}
