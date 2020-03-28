interface Navigator {
  webkitPersistentStorage: {
    requestQuota(
      size: number,
      onSuccess: (size: number) => void,
      onFailure?: (error: DOMError) => void
    ): void
  }
}
