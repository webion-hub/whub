import React from "react";
import { FormInputs } from "../abstractions/form/FormInputs";
import { Form } from "../lib/Form";

export const useForm = (values: FormInputs) => {
  const [, setFormValues] = React.useState<FormInputs>(values);
  const form = React.useRef(new Form(setFormValues, values));
  return form.current;
};
