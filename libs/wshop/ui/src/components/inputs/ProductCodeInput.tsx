import { LoopRounded } from "@mui/icons-material";
import { IconButton, TextField, Tooltip } from "@mui/material";
import { UUIDFactory, Validators } from "@whub/wui";
import { ConfigUtils } from "../../lib/ConfigUtils";
import { ProductInput } from "../ProductInput";

export function ProductCodeInput() {
  return (
    <ProductInput
      name='code'
      value=''
      getValidators={config => [
        Validators.required,
        ...ConfigUtils.getValidators(config, 'general')
      ]}
    >
      {
        (_, i) =>
          <TextField
            {...i}
            size="small"
            variant="outlined"
            label="Codice prodotto"
            color="secondary"
            required
            fullWidth
            helperText={i.error && "Codice non inserito o già esistente."}
            InputProps={{
              endAdornment: (
                <Tooltip
                  title="Genera codice"
                  arrow
                >
                  <IconButton
                    onClick={() => i.onChange?.({
                      target: {
                        value: UUIDFactory.getUUIDFromDate()
                      }
                    })}
                  >
                    <LoopRounded/>
                  </IconButton>
                </Tooltip>
              ),
            }}
          />
      }
    </ProductInput>
  )
}

