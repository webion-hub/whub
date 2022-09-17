import { TextField } from "@mui/material";
import { Validators } from "@whub/wui";
import { ConfigUtils } from "../../lib/ConfigUtils";
import { ProductInput } from "../ProductInput";

export function ProductNameInput() {
  return (
    <ProductInput
      name='name'
      value=""
      getValidators={config => [
        Validators.required,
        ...ConfigUtils.getValidators(config, 'general')
      ]}
    >
      {
        (_, i)  =>
          <TextField
            {...i}
            size="small"
            variant="outlined"
            label="Nome"
            color="secondary"
            required
          />
      }
    </ProductInput>
  )
}
