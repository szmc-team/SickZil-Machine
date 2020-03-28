export class FileManager {
  constructor(private db: IDBDatabase) {}

  async saveFile(file: File, name: string) {
    const fileReader = new FileReader()

    fileReader.readAsArrayBuffer(file)

    const arrayBuffer = await new Promise<ArrayBuffer>(
      (res, rej) =>
        (fileReader.onload = ({ target }) =>
          target ? res(target.result as ArrayBuffer) : rej())
    )

    const transaction = this.db.transaction('img', 'readwrite')
    const store = transaction.objectStore('img')
    const request = store.put(arrayBuffer, 'hello')

    await new Promise<void>((res, rej) => {
      request.onsuccess = () => res()
      request.onerror = rej
    })
  }

  async readFile(name: string) {
    try {
      const tx = this.db.transaction('img', 'readonly')
      const imgStore = tx.objectStore('img')
      const cursor = imgStore.openCursor()

      const arrayBuffer = await new Promise<ArrayBuffer>((res, rej) => {
        cursor.onsuccess = () => res(cursor.result?.value)
        cursor.onerror = () => rej()
      })

      return arrayBuffer
    } catch {
      return null
    }
  }
}
