import { ChangeEvent } from "react";
import { FormValue, FormValues } from "../abstractions/form/FormValues";
import { Validator } from "../abstractions/form/Validator";
import { Validators } from "./Validators";

export class Form {
  private readonly setter: React.Dispatch<FormValues>
  private values: FormValues

  constructor(setter: React.Dispatch<FormValues>, values: FormValues) {
    this.setter = setter;
    this.values = values;
  }

  setValues = (values: FormValues) => {
    this.setter(values)
    this.values = values;
  }

  setValue = (key: string) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setValues({
      ...this.values,
      [key]: {
        ...this.values[key],
        value: e.target.value,
      },
    })
  }

  getValue = (key: string) => {
    return this.values[key]?.value
  }

  getValues = () => {
    const values = Object.entries(this.values)
      .map(e => [e[0], e[1].value])

    return Object.fromEntries(values)
  }

  isValid = (key: string) => {
    return this.values[key]?.isValid ?? true
  }

  validateByKey = (validators: Validator[], value: FormValue) => {
    return validators
      .map(validator => validator(value))
      .every(v => v)
      ?? true
  }

  isFormValid = () => {
    const formEntries = Object.entries(this.values)
    const formInit: FormValues = {}

    const newFormValues = formEntries
      .reduce((acc, formEntry) => {
        const formKey = formEntry[0]
        const formValue = this.values[formKey]
        const isValid = Validators
          .validate(formValue.value, formValue.validators)

        acc[formKey] = {
          ...this.values[formKey],
          isValid: isValid,
        }

        return acc
      }, formInit)

    this.setValues(newFormValues)

    return Object
      .values(newFormValues)
      .every(v => v.isValid)
  }
}