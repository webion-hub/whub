import { LoopRounded } from "@mui/icons-material";
import { IconButton, TextField, Tooltip } from "@mui/material";
import { InputValidator, UUIDFactory, Validators } from "@whub/wui";

export function ProductCodeInput() {
  return (
    <InputValidator
      mode="manual"
      name="code"
      validators={[Validators.required, Validators.max(256)]}
      value=''
    >
      {
        i =>
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
    </InputValidator>
  )
}

