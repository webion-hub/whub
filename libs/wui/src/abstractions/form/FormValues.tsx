import { Validator } from "./Validator";

export interface FormValue {
  readonly value: FormValueTypes,
  readonly validators: Validator[],
  readonly isValid?: boolean,
}

export interface FormValues {
  [key: string]: FormValue,
}

export type FormValueTypes = string | number | boolean
