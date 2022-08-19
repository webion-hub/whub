export interface InputBaseProps<T> {
  readonly name?: string,
  readonly error?: boolean,
  readonly onChange?: (e: InputEvent<T>) => void,
  readonly value?: T,
  readonly disabled?: boolean,
}

interface InputEvent<T> {
  readonly target: InputValue<T>
}

interface InputValue<T> {
  readonly value: T
}
