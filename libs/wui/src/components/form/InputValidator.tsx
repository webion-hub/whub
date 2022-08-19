import React, { useEffect, useState } from "react"
import { FormValueTypes } from "../../abstractions/form/FormInputs"
import { Validator } from "../../abstractions/form/Validator"
import { useForm } from "../../hooks/useForm"

export interface InputValidatorProps<T> {
  readonly name: string,
  readonly value?: T,
  readonly isValid?: boolean,
  readonly validators?: Validator[],
  readonly children: any,
}

export function InputValidator(props: InputValidatorProps<FormValueTypes>) {
  const form = useForm()
  const [first, setFirst] = useState(true)

  useEffect(() => {
    form.addInput(
      props.name,
      {
        value: props.value ?? '',
        isValid: props.isValid ?? true,
        validators: props.validators ?? []
      }
    )

    setFirst(false)

    return () => form.removeInput(props.name)
  }, [])

  const childrenWithProps = React.Children.map(props.children, (child) => {
    const formControlName = props.name;

    if (!formControlName)
      return child;

    return React.cloneElement(child, {
      error: !form.isValid(formControlName),
      onChange: form.setTargetValue(formControlName),
      value: form.getValue(formControlName) ?? props.value,
      disabled: form.getDisabled(formControlName) ?? false,
    });
  });

  if(first)
    return props.children

  return childrenWithProps
}
