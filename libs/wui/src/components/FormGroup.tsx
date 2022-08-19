import React, { createContext, FormEvent, FormEventHandler, ReactElement, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { Form } from "../lib/Form";
import { ChildrenProp } from "../abstractions/props/ChildrenProps";
import { Stack, styled, SxProps, Theme } from "@mui/material";
import { ResponsiveStyleValue } from "@mui/system";
import { FormInputs, FormValueTypes } from "../abstractions/form/FormInputs";
import { InputBaseProps } from "../abstractions/form/InputBaseProps";
import { Validators } from "../lib/Validators";
import { Validator } from "../abstractions/form/Validator";
import { first } from "lodash";

/*
export interface FormGroupProps {
  readonly form: Form;
  readonly onSubmit: FormEventHandler;
  readonly children: ChildrenProp;
  readonly sx?: SxProps<Theme>,
  readonly spacing?: ResponsiveStyleValue<string | number>
}

export const FormGroup = React.forwardRef<HTMLFormElement, FormGroupProps>((props, ref) => {
  const childrenWithProps = React.Children.map(props.children, (child) => {
    const formControlName = child.props.name;

    if (!formControlName) return child;

    return React.cloneElement(child, {
      error: !props.form.isValid(formControlName),
      onChange: props.form.setValue(formControlName),
      value: props.form.getValue(formControlName),
    });
  });

  return (
    <Stack
      ref={ref}
      component="form"
      noValidate
      onSubmit={props.onSubmit}
      sx={props.sx}
      spacing={props.spacing}
    >
      {childrenWithProps}
    </Stack>
  );
})*/



const StyledForm = styled('form')({})

interface FormGroup {
  readonly values?: FormInputs,
  readonly children?: ReactNode,
  readonly onSubmit: (form: Form) => void;
  readonly sx?: SxProps<Theme>,
}

interface FormGroupContext {
  readonly form: Form,
}

export const FormGroupContext = createContext<FormGroupContext>({
  form: {} as Form
})

export const FormGroup = (props: FormGroup) => {
  const [, setFormValues] = React.useState<FormInputs>(props.values ?? {});
  const form = useRef<Form>(new Form(setFormValues, props.values ?? {}));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    form.current.isFormValid()
    props.onSubmit(form.current)
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


const useForm = () => {
  return useContext(FormGroupContext).form
}

interface InputValidatorProps<T> {
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
