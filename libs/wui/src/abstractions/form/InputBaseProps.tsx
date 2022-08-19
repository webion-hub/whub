export interface InputBaseProps<T> {
  readonly name?: string,
  readonly error?: boolean,
  readonly onChange?: (value: T) => void,
  readonly value?: T,
}
