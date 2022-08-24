import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useShopApi } from "@whub/apis-react";
import { Category } from "@whub/wshop-api";
import { InputValidator, InputValidatorGroup, InputValidatorGroupProps, NumberInput, Validators } from "@whub/wui";
import { useState } from "react";

export function AddProductStepOne(props: InputValidatorGroupProps) {
  const shopApi = useShopApi()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)

  const fetchCategories = () => {
    setLoading(true)
    shopApi.categories
      .list()
      .then(res => console.log(res))
      .finally(() => setLoading(false))
  }

  return (
    <InputValidatorGroup
      onSuccess={props.onSuccess}
      onError={props.onError}
    >
      <InputValidator
        name="name"
        validators={[Validators.required]}
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
        name="code"
      >
        <TextField
          size="small"
          variant="outlined"
          label="Codice prodotto"
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
              onOpen={fetchCategories}
              options={categories}
              onChange={(_, value) => i.onChange?.({ target: { value: value } })}
              getOptionLabel={(option) => option.name}
              loading={loading}
              renderInput={(params) =>
                <TextField
                  {...params}
                  error={i.error}
                  disabled={i.disabled}
                  size="small"
                  variant="outlined"
                  label="Categoria"
                  color="secondary"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />}
            />
        }
      </InputValidator>
    </InputValidatorGroup>
  )
}
