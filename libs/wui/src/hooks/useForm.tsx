import React from "react";
import { FormValues } from "../abstractions/form/FormValues";
import { Form } from "../lib/Form";

export const useForm = (values: FormValues) => {
  const [, setFormValues] = React.useState<FormValues>(values);
  const form = React.useRef(new Form(setFormValues, values));
  return form.current;
};
