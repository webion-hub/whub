import { FormValueTypes } from "./FormValues";

export interface FormEvent {
  readonly target: FormTargetEvent,
}

export interface FormTargetEvent {
  readonly value?: FormValueTypes
}
