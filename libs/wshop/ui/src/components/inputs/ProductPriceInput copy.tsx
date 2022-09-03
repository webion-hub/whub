import { TextField } from "@mui/material";
import { InputValidator, NumberInput } from "@whub/wui";

export function ProductPriceInput() {
  return (
    <InputValidator
      mode="manual"
      name="price"
      value={NaN}
    >
      {
        i =>
          <TextField
            {...i}
            onChange={e => i.onChange?.({ target: { value: Number(e.target.value) }})}
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
      }

    </InputValidator>
  )
}

