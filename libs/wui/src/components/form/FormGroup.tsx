import { styled, SxProps, Theme } from "@mui/material";
import _ from "lodash";
import { createContext, FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { FormInputs, FormValueInputs } from "../../abstractions/form/FormInputs";
import { Form } from "../../lib/Form";

const StyledForm = styled('form')({})

type FormChildren = (form: Form) => ReactNode

interface FormGroupProps {
  readonly values?: FormValueInputs,
  readonly children?: ReactNode | FormChildren,
  readonly onSubmit?: (form: Form) => void;
  readonly sx?: SxProps<Theme>,
}

interface FormGroupContext {
  readonly form: Form,
}

export const FormGroupContext = createContext<FormGroupContext>({
  form: {} as Form
})

export const FormGroup = (props: FormGroupProps) => {
  const [readyForSubmit, setReadeyForSubmit] = useState(false);

  const setFormValues = (v: FormInputs) => {
    values.current = v
  }

  const getPropsFormInputs = (): FormInputs => {
    const inputs = Object
    .entries(_.cloneDeep(props.values ?? {}))
    .map(v => [v[0], { value: v[1], validators: [] }])

    return Object.fromEntries(inputs)
  }

  const values = useRef<FormInputs>(getPropsFormInputs());
  const form = useRef<Form>(new Form(setFormValues, getPropsFormInputs()));

  useEffect(() => {
    if(!readyForSubmit)
      return

    setReadeyForSubmit(false)
    submit()
  }, [values.current, readyForSubmit])

  const submit = () => {
    form.current.isFormValid()
    props.onSubmit?.(form.current)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.current.clearErrors()
    setReadeyForSubmit(true)
  }

  const children = typeof props.children === 'function'
    ? props.children(form.current)
    : props.children

  return (
    <FormGroupContext.Provider
      value={{ form: form.current }}
    >
      <StyledForm
        onSubmit={onSubmit}
        noValidate
        sx={props.sx}
      >
        {children}
      </StyledForm>
    </FormGroupContext.Provider>
  )
}

