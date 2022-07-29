import React, { FormEventHandler } from "react";
import { Form } from "../lib/Form";
import { ChildrenProp } from "../abstractions/props/ChildrenProps";
import { Grid } from "@mui/material";

export interface FormGroupProps {
  readonly form: Form;
  readonly onSubmit: FormEventHandler;
  readonly children: ChildrenProp;
}

export const FormGroup = React.forwardRef<any, FormGroupProps>((props, ref) => {
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
    <Grid 
      ref={ref}
      {...props} 
      component="form" 
      noValidate 
      onSubmit={props.onSubmit}
    >
      {childrenWithProps}
    </Grid>
  );
})