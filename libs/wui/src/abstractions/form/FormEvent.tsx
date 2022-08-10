export interface FormEvent {
  readonly target: FormTargetEvent,
}

export interface FormTargetEvent {
  readonly value?: number | string | boolean
}
