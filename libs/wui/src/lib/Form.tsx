import { ChangeEvent } from "react";
import { FormInput, FormInputs, FormValueTypes } from "../abstractions/form/FormInputs";
import { Validator } from "../abstractions/form/Validator";
import { Validators } from "./Validators";

export class Form {
  private readonly setter: React.Dispatch<FormInputs>
  private inputs: FormInputs

  constructor(setter: React.Dispatch<FormInputs>, inputs: FormInputs) {
    this.setter = setter;
    this.inputs = inputs;
  }


  removeInput = (key: string) => {
    delete this.inputs[key]
  }

  addInput = (key: string, input: FormInput) => {
    this.inputs = {
      ...this.inputs,
      [key]: input
    }
  }

  setValues = (inputs: FormInputs) => {
    this.setter(inputs)
    this.inputs = inputs;
  }

  setValue = (key: string) => (value: any) => {
    this.setValues({
      ...this.inputs,
      [key]: {
        ...this.inputs[key],
        value: value,
      },
    })
  }

  setTargetValue = (key: string) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setValue(key)(e.target.value)
  }

  getValue = (key: string) => {
    return this.inputs[key]?.value
  }

  getValues = () => {
    const values = Object.entries(this.inputs)
      .map(e => [e[0], e[1].value])

    return Object.fromEntries(values)
  }

  isValid = (key: string) => {
    return this.inputs[key]?.isValid ?? true
  }

  validateByKey = (validators: Validator[], value: FormValueTypes) => {
    return validators
      .map(validator => validator(value))
      .every(v => v)
      ?? true
  }

  isFormValid = () => {
    const formEntries = Object.entries(this.inputs)
    const formInit: FormInputs = {}

    const newFormValues = formEntries
      .reduce((acc, formEntry) => {
        const formKey = formEntry[0]
        const formValue = this.inputs[formKey]
        const isValid = Validators
          .validate(formValue.value, formValue.validators)

        acc[formKey] = {
          ...this.inputs[formKey],
          isValid: isValid,
        }

        return acc
      }, formInit)

    this.setValues(newFormValues)

    return Object
      .values(newFormValues)
      .every(v => v.isValid)
  }

  clear() {
    const keys = Object.keys(this.inputs)
    keys.forEach(k => this.setValue(k)(''))
  }

  getDisabled(key: string) {
    return this.inputs[key]?.disabled
  }

  disableByKey = (key: string) => (status: boolean) => {
    this.setValues({
      ...this.inputs,
      [key]: {
        ...this.inputs[key],
        disabled: status,
      },
    })
  }

  disable(status: boolean) {
    const keys = Object.keys(this.inputs)
    keys.forEach(k => this.disableByKey(k)(status))
  }
}
