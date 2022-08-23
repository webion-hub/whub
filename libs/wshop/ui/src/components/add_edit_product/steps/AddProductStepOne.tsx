import { Autocomplete, TextField } from "@mui/material";
import { InputValidator, InputValidatorGroup, InputValidatorGroupProps, NumberInput, Validators } from "@whub/wui";

export function AddProductStepOne(props: InputValidatorGroupProps) {
  return (
    <InputValidatorGroup
      onSuccess={props.onSuccess}
      onError={props.onError}
    >
      <InputValidator
        name="name"
        validators={[Validators.required]}
        onError={() => console.log('sus')}
      >
        <TextField
          size="small"
          variant="outlined"
          label="Nome"
          color="secondary"
          required
        />
      </InputValidator>
      <InputValidator
        name="price"
      >
        <TextField
          size="small"
          variant="outlined"
          label="Prezzo"
          color="secondary"
          InputProps={{
            inputComponent: NumberInput as any,
            inputProps: {
              prefix: '€',
              decimalSeparator: ',',
              allowNegative: false
            }
          }}
        />
      </InputValidator>
      <InputValidator
        mode="manual"
        name="category"
      >
        {
          i =>
            <Autocomplete
              options={['ciao']}
              onChange={(_, value) => i.onChange?.({ target: { value: value } })}
              renderInput={(params) =>
                <TextField
                  {...params}
                  error={i.error}
                  disabled={i.disabled}
                  size="small"
                  variant="outlined"
                  label="Categoria"
                  color="secondary"
                />}
            />
        }
      </InputValidator>
    </InputValidatorGroup>
  )
}
