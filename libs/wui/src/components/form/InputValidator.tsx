import React, { ReactNode, useEffect, useRef, useState } from "react"
import { BehaviorSubject, Observable, Subscriber, TeardownLogic } from "rxjs"
import { InputBaseProps } from "../../abstractions/form/InputBaseProps"
import { Validator } from "../../abstractions/form/Validator"
import { useForm } from "../../hooks/useForm"
import { useSubjectState } from "../../hooks/useSubject"
import { Form } from "../../lib/Form"

interface InputValidatorPropsBase<T> {
  readonly name: string,
  readonly value: T,
  readonly isValid?: boolean,
  readonly validators?: Validator[],
  readonly onSuccess?: (name: string) => void,
  readonly onError?: (name: string) => void,
}

interface InputValidatorAutoProps<T> extends InputValidatorPropsBase<T> {
  readonly mode?: 'auto',
  readonly children: any,
}

interface InputValidatorManualProps<T> extends InputValidatorPropsBase<T> {
  readonly mode: 'manual',
  readonly children: (input: InputBaseProps<T>, form: Form) => ReactNode,
}

type InputValidatorProps<T> = InputValidatorAutoProps<T> | InputValidatorManualProps<T>

export function InputValidator<T>(props: InputValidatorProps<T>) {
  const form = useForm()
  const isValidRef = useRef(true)
  const [first, setFirst] = useState(true)
  const {
    state: value,
    setState: setValue,
    subject: valueSubject
  } = useSubjectState<T | undefined>(props.value)

  useEffect(() => {
    form.addInput(
      props.name,
      {
        value: props.value ?? '',
        isValid: props.isValid ?? true,
        validators: props.validators ?? [],
        setter: setValue,
        subject: valueSubject
      }
    )

    setFirst(false)

    return () => form.removeInput(props.name)
  }, [valueSubject])

  useEffect(() => {
    isValidRef.current
      ? props.onSuccess?.(props.name)
      : props.onError?.(props.name)
  }, [isValidRef.current])

  const getInputProps = (): InputBaseProps<T> => {
    const formControlName = props.name;
    const isValid = form.isValid(formControlName)

    isValidRef.current = isValid

    return {
      error: !isValid,
      onChange: (e) => form.setTargetValue(formControlName)(e as any),
      value: value ?? props.value,
      disabled: form.getDisabled(formControlName) ?? false,
    }
  }

  if(props.mode === 'manual')
    return props.children(getInputProps(), form)

  if(first)
    return props.children

  const childrenWithProps = React.Children.map(props.children, (child) => {
    return React.cloneElement(child, getInputProps());
  });

  return childrenWithProps
}

