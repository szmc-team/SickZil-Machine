import localforage from 'localforage'
import { v4 } from 'uuid'

export class FileManager {
  async create(file: File) {
    const id = v4()
    const arrayBuffer = await blobToArrayBuffer(file)
    const meta = extractFileMetadata(id, file)

    await this.blobStorage.setItem(id, arrayBuffer)
    await this.metaStorage.setItem(id, meta)

    return id
  }

  async read(id: string) {
    const arrayBuffer = await this.blobStorage.getItem<ArrayBuffer | null>(id)
    const meta = await this.metaStorage.getItem<FileMetadata | null>(id)
    if (!arrayBuffer || !meta) return null
    const blob = arrayBufferToBlob(arrayBuffer)
    const url = this.generateUrl(id, blob)
    const { name } = meta

    return { id, name, blob, url }
  }

  async readAll() {
    const keys = await this.metaStorage.keys()

    const metas = await Promise.all(
      keys.map(id => this.metaStorage.getItem<FileMetadata>(id))
    )

    const arrayBuffers = await Promise.all(
      keys.map(id => this.blobStorage.getItem<ArrayBuffer>(id))
    )

    return metas.map(({ id, name }, idx) => {
      const blob = arrayBufferToBlob(arrayBuffers[idx])
      const url = this.generateUrl(id, blob)

      return { id, name, blob, url }
    })
  }

  async delete(id: string) {
    await this.blobStorage.removeItem(id)
    await this.metaStorage.removeItem(id)
    this.flushUrlCache(id)
    return id
  }

  private generateUrl(id: string, blob: Blob) {
    const cachedUrl = this.urlCache.get(id)
    if (cachedUrl) return cachedUrl

    const url = URL.createObjectURL(blob)
    this.urlCache.set(id, url)
    return url
  }

  private flushUrlCache(id: string) {
    this.urlCache.delete(id)
  }

  private blobStorage = localforage.createInstance({
    name: 'blob',
    driver: localforage.INDEXEDDB,
  })

  private metaStorage = localforage.createInstance({
    name: 'meta',
    driver: localforage.LOCALSTORAGE,
  })

  private urlCache = new Map<string, string>()
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

function arrayBufferToBlob(arrayBuffer: ArrayBuffer) {
  return new Blob([arrayBuffer])
}

interface FileMetadata {
  id: string
  name: string
}

function extractFileMetadata(id: string, file: File) {
  const metadata: FileMetadata = { id, name: file.name }
  return metadata
}
