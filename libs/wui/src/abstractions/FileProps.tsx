export interface FileProps<T> {
  readonly onChange?: (file: T[]) => void,
  readonly files?: T[],
}
