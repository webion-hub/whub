import { Autocomplete, Box, CircularProgress, Link, Stack, TextField } from "@mui/material"
import { useShopApi } from "@whub/apis-react"
import { Category } from "@whub/wshop-api"
import { InputValidator, Validators } from "@whub/wui"
import { useState } from "react"
import { CreateCategoryDialog } from "../dialogs/CreateCategoryDialog"

export function ProductCategoryInput() {
  const shopApi = useShopApi()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [openCreateCategory, setOpenCreateCategory] = useState(false)

  const fetchCategories = () => {
    setLoading(true)
    shopApi.categories
      .list()
      .then(res => setCategories(res.data))
      .finally(() => setLoading(false))
  }

  return (
    <InputValidator
      mode="manual"
      name="category"
      value={{} as Category}
      validators={[Validators.customValidator((v: Category) => Validators.max(256)(v.name))]}
    >
      {
        (i, form) =>
          <Stack
            direction="column"
          >
            <Autocomplete
              value={i.value}
              onOpen={fetchCategories}
              onChange={(_, value) => i.onChange?.({ target: { value: value ?? {} as Category } })}
              options={categories}
              getOptionLabel={option => option.name ?? ''}
              isOptionEqualToValue={(o, v) =>
                v.name === o.name ||
                !v.name && o.name === categories?.[0].name
              }
              loading={loading}
              fullWidth
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
    </InputValidator>
  )
}
