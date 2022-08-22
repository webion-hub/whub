import { Validator } from "./Validator";

export interface FormInput {
  readonly value: FormValueTypes,
  readonly validators: Validator[],
  readonly isValid?: boolean,
  readonly disabled?: boolean,
}

export interface FormInputs {
  [key: string]: FormInput,
}

export type FormValueTypes = string | number | boolean
