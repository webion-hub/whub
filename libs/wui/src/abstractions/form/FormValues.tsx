import { Validator } from "./Validator";

export interface FormValue {
  readonly value: any,
  readonly validators: Validator[],
  readonly isValid?: boolean,
}

export interface FormValues {
  [key: string]: FormValue,
}