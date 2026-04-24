/// <reference types="vite/client" />

interface FilePickerAcceptType {
  description: string
  accept: Record<string, string | string[]>
}

interface SaveFilePickerOptions {
  excludeAcceptAllOption?: boolean
  suggestedName?: string
  types?: FilePickerAcceptType[]
}

interface Window {
  showSaveFilePicker(options?: SaveFilePickerOptions): Promise<FileSystemFileHandle>
}
