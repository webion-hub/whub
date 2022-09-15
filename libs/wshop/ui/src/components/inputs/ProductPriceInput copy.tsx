import { TextField } from "@mui/material";
import { NumberInput, Validators } from "@whub/wui";
import { ConfigUtils } from "../../lib/ConfigUtils";
import { ProductInput } from "../ProductInput";

export function ProductPriceInput() {
  return (
    <ProductInput
      name="price"
      value={NaN}
      getValidators={config => [
        Validators.isRequired(config.required),
        ...ConfigUtils.getValidators(config, 'general'),
      ]}
    >
      {
        (config, i) =>
          <TextField
            {...i}
            onChange={e => i.onChange?.({ target: { value: Number(e.target.value) }})}
            size="small"
            required={config.required}
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
    </ProductInput>
  )
}

