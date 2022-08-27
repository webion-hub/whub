import { BehaviorSubject } from "rxjs";
import { Validator } from "./Validator";

export interface FormInput {
  readonly value: FormValueTypes,
  readonly validators: Validator[],
  readonly isValid?: boolean,
  readonly disabled?: boolean,
  readonly setter?: React.Dispatch<any>,
  readonly subject?: BehaviorSubject<any>
}

export interface FormValueInputs {
  [key: string]: FormValueTypes,
}

export interface FormInputs {
  [key: string]: FormInput,
}

export type FormValueTypes = any
