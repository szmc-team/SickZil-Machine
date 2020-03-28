export class FileManager {
  constructor(private fileSystem: FileSystem) {}

  async getDirectory(path: string, options?: Flags) {
    return new Promise<DirectoryEntry>((res, rej) =>
      this.fileSystem.root.getDirectory(path, options, res, rej)
    )
  }
}
