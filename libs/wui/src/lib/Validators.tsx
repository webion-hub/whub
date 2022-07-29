import { Validator } from "../abstractions/form/Validator";

export class Validators {
  static validate(value: any, validators: Validator[]) {
    return validators
      ?.map(validator => validator(value))
      ?.every(v => v)
      ?? true
  }

  static required = (value: any) => {
    return Boolean(value)
  }

  static isAnEmail =  (email: string): boolean => {
    return this.isAPattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)(email);
  }

  static isATelephoneNumber = (telephoneNumber: string) => {
    return this.isAPattern(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im)(telephoneNumber);
  }

  static max = (maxValue: number) => (value?: string) => {
    return !value || value.length < maxValue
  }

  static min = (minValue: number) => (value?: string) => {
    return !value || value.length > minValue
  }

  static isAPattern = (pattern: RegExp) => (value?: string) => {
    return !value || !!value
        .toLowerCase()
        .match(pattern)
  }

  static customValidator = (f: Validator) => (value?: any) => {
    return !value || f(value);
  }
}