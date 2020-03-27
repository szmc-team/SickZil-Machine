/* eslint-disable */
window.requestFileSystem =
  window.requestFileSystem ?? window.webkitRequestFileSystem;

declare global {
  interface Navigator {
    webkitPersistentStorage: {
      requestQuota(
        size: number,
        onSuccess: (size: number) => void,
        onFailure?: (error: DOMError) => void
      ): void;
    };
  }
}

const DISK_SIZE = 1024 * 1024 * 64;
export async function configureFileSystem() {
  await new Promise<number>((res, rej) =>
    navigator.webkitPersistentStorage.requestQuota(DISK_SIZE, res, rej)
  );
  const fileSystem = await new Promise<FileSystem>((res, rej) =>
    window.requestFileSystem(window.PERSISTENT, 1024 * 1024 * 1024, res, rej)
  );

  fileSystem.root.getDirectory("hello/world", {}, x => {
    console.log(123, x);
    x.getParent(y => {
      console.log(y);

      fileSystem.root.getDirectory("hello", {}, z => {
        console.log(123, z);
      });
    });
  });

  console.log(fileSystem);
}

configureFileSystem();

export default 123;

/* eslint-ensable */
