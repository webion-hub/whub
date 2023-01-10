import uniqueId from 'lodash/uniqueId';
import { ChangeEvent } from 'react';
import { BehaviorSubject } from 'rxjs';
import {
  FormInput,
  FormInputs,
  FormValueTypes,
} from '../abstractions/form/FormInputs';
import { Validator } from '../abstractions/form/Validator';
import { Validators } from './Validators';

export class Form {
  public readonly id: string;
  public readonly newInputSubject: BehaviorSubject<string>;

  private readonly setter: React.Dispatch<FormInputs>;
  private inputs: FormInputs;

  constructor(setter: React.Dispatch<FormInputs>, inputs: FormInputs) {
    this.setter = setter;
    this.inputs = inputs;
    this.id = uniqueId();
    this.newInputSubject = new BehaviorSubject<string>('');
  }

  removeInput = (key: string) => {
    this.newInputSubject.next(key);
    delete this.inputs[key];
  };

  addInput = (key: string, input: FormInput) => {
    this.newInputSubject.next(key);
    this.inputs = {
      ...this.inputs,
      [key]: input,
    };

    this.setter(this.inputs);
  };

  setIsValid = (key: string) => (state: boolean) => {
    this.setValues({
      ...this.inputs,
      [key]: {
        ...this.inputs[key],
        isValid: state,
      },
    });
  };

  setValues = (inputs: FormInputs) => {
    this.setter(inputs);
    this.inputs = inputs;
  };

  setValue = (key: string) => (value: any) => {
    this.inputs[key]?.setter?.(value);
    this.setValues({
      ...this.inputs,
      [key]: {
        ...this.inputs[key],
        value: value,
      },
    });
  };

  setTargetValue =
    (key: string) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      this.setValue(key)(value);
    };

  getSubject = (key: string) => {
    return this.inputs[key]?.subject;
  };

  getValue = (key: string) => {
    return this.inputs[key]?.value;
  };

  getValues = () => {
    const values = Object.entries(this.inputs).map((e) => [e[0], e[1].value]);

    return Object.fromEntries(values);
  };

  getErrors = () => {
    const values = Object.entries(this.inputs).map((e) => [
      e[0],
      !e[1].isValid,
    ]);

    return Object.fromEntries(values);
  };

  isValid = (key: string) => {
    return this.inputs[key].isValid ?? true;
  };

  validate(key: string) {
    const input = this.inputs[key];

    const isValid = input.validators.every((v) => v(input.value));
    this.setIsValid(key)(isValid);
    return isValid;
  }

  validateByKey = (validators: Validator[], value: FormValueTypes) => {
    return (
      validators.map((validator) => validator(value)).every((v) => v) ?? true
    );
  };

  isFormValid = () => {
    const formEntries = Object.entries(this.inputs);
    const formInit: FormInputs = {};

    const newFormValues = formEntries.reduce((acc, formEntry) => {
      const formKey = formEntry[0];
      const formValue = this.inputs[formKey];
      const isValid = Validators.validate(
        formValue.value,
        formValue.validators
      );

      acc[formKey] = {
        ...this.inputs[formKey],
        isValid: isValid,
      };

      return acc;
    }, formInit);

    this.setValues(newFormValues);

    return Object.values(newFormValues).every((v) => v.isValid);
  };

  clearErrors() {
    const keys = Object.keys(this.inputs);
    keys.forEach((k) => this.setIsValid(k)(true));
  }

  clear() {
    const keys = Object.keys(this.inputs);
    keys.forEach((k) => this.setValue(k)(''));
  }

  getDisabled(key: string) {
    return this.inputs[key]?.disabled;
  }

  disableByKey = (key: string) => (status: boolean) => {
    this.setValues({
      ...this.inputs,
      [key]: {
        ...this.inputs[key],
        disabled: status,
      },
    });
  };

  disable(status: boolean) {
    const keys = Object.keys(this.inputs);
    keys.forEach((k) => this.disableByKey(k)(status));
  }
}
