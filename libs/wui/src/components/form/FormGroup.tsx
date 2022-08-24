import React, { createContext, FormEvent, ReactNode, useEffect, useRef } from "react";
import { Form } from "../../lib/Form";
import { styled, SxProps, Theme } from "@mui/material";
import { FormInputs } from "../../abstractions/form/FormInputs";

const StyledForm = styled('form')({})

interface FormGroupProps {
  readonly values?: FormInputs,
  readonly children?: ReactNode,
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
  const [readyForSubmit, setReadeyForSubmit] = React.useState(false);
  const [values, setFormValues] = React.useState<FormInputs>(props.values ?? {});
  const form = useRef<Form>(new Form(setFormValues, props.values ?? {}));


  useEffect(() => {
    if(!readyForSubmit)
      return

    setReadeyForSubmit(false)
    submit()
  }, [values, readyForSubmit])

  const submit = () => {
    form.current.isFormValid()
    props.onSubmit?.(form.current)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.current.clearErrors()
    setReadeyForSubmit(true)
  }

  return (
    <FormGroupContext.Provider
      value={{ form: form.current }}
    >
      <StyledForm
        onSubmit={onSubmit}
        noValidate
        sx={props.sx}
      >
        {props.children}
      </StyledForm>
    </FormGroupContext.Provider>
  )
}

