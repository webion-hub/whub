import { FormValueTypes } from "./FormInputs";

export interface FormEvent {
  readonly target: FormTargetEvent,
}

export interface FormTargetEvent {
  readonly value?: FormValueTypes
}
