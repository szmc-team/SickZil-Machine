import { image } from 'faker'
import { FileManager } from './FileManager'

URL.createObjectURL = jest.fn(() => image.imageUrl())

describe('FileManager', () => {
  it('create and read', async () => {
    const fileManager = new FileManager()
    const file = new File([], 'hello.file')
    const id = await fileManager.create(file)
    const resultA = await fileManager.read(id)
    const resultB = await fileManager.read('NEVER')
    const resultC = await fileManager.readAll()

    expect(resultA).not.toBeNull()
    expect(resultB).toBeNull()
    expect(resultC).toContainEqual(resultA)
  })

  it('create and delete', async () => {
    const fileManager = new FileManager()
    const file = new File([], 'yoyo.shusi')
    const id = await fileManager.create(file)
    const resultA = await fileManager.read(id)
    await fileManager.delete(id)
    const resultB = await fileManager.read(id)

    expect(resultA).not.toBeNull()
    expect(resultB).toBeNull()
  })
})
