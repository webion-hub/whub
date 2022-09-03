import { TextField } from "@mui/material";
import { InputValidator, Validators } from "@whub/wui";

export function ProductNameInput() {
  return (
    <InputValidator
      name="name"
      value=''
      validators={[Validators.required, Validators.max(512)]}
    >
      <TextField
        size="small"
        variant="outlined"
        label="Nome"
        color="secondary"
        required
      />
    </InputValidator>
  )
}
