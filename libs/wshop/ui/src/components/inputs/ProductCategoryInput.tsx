import { Autocomplete, Box, CircularProgress, Link, Stack, TextField } from "@mui/material"
import { useShop } from "@whub/apis-react"
import { Category } from "@whub/wshop-api"
import { Validators } from "@whub/wui"
import { useState } from "react"
import { CreateCategoryDialog } from "../dialogs/CreateCategoryDialog"
import { ProductInput } from "../ProductInput"

export function ProductCategoryInput() {
  const api = useShop().api

  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [openCreateCategory, setOpenCreateCategory] = useState(false)

  const fetchCategories = () => {
    setLoading(true)
    api.categories
      .list()
      .then(res => setCategories(res.data))
      .finally(() => setLoading(false))
  }

  return (
    <ProductInput
      name='category'
      value={{} as Category}
      getValidators={config => [
        Validators.customValidator((c: Category) =>
        Validators.isRequired(!!config.required)(c.name) &&
        Validators.validate(c.name, config.validators.general ?? [])
      )
      ]}
    >
      {
        (config, i, form) =>
          <Stack
            direction="column"
          >
            <Autocomplete
              value={i.value}
              onOpen={fetchCategories}
              onChange={(_, value) => i.onChange?.({ target: { value: (value ?? {}) as Category } })}
              options={categories}
              getOptionLabel={option => (option as Category).name ?? ''}
              isOptionEqualToValue={(o, v) =>
                v.name === o.name ||
                !v.name && o.name === categories?.[0].name
              }
              loading={loading}
              fullWidth
              renderInput={(params) =>
                <TextField
                  {...params}
                  required={config.required}
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
                        {
                          loading &&
                            <Box
                              sx={{
                                transform: 'translate(-32px, 4px)'
                              }}
                            >
                              <CircularProgress color="inherit" size={20} />
                            </Box>
                        }
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              }
            />
            <Link
              type="button"
              component="button"
              variant="caption"
              textAlign="inherit"
              color="secondary"
              onClick={() => setOpenCreateCategory(true)}
              sx={{
                whiteSpace: 'nowrap',
                width: 'min-content'
              }}
            >
              Categoria non trovata? Creane una nuova
            </Link>
            <CreateCategoryDialog
              open={openCreateCategory}
              onCreate={category => form.setValue('category')(category)}
              onClose={() => setOpenCreateCategory(false)}
            />
          </Stack>
      }
    </ProductInput>
  )
}
