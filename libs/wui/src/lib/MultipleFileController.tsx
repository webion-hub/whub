import { FileWithId } from "../abstractions/FileWithId"

export class MultipleFileController {
  static initFiles = <T,>(files: T[]): FileWithId<T>[] => {
    return files
      .map((f, i) => ({
        id: i,
        file: f,
      }))
  }

  static addFile = <T,>(file: T, list: FileWithId<T>[]) => {
    list.push({
      file: file,
      id: list.length
    })

    return [...list]
  }

  static removeFile = <T,>(img: FileWithId<T>, list: FileWithId<T>[]) => {
    return list
      .filter(i => i.id !== img.id)
      .map((i, k) => ({ ...i, id: k }))
  }
}
