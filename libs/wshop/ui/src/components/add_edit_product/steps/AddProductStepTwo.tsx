import { CloseRounded } from "@mui/icons-material"
import { Box, Button, Divider, IconButton, TextField } from "@mui/material"
import { Product } from "@whub/wshop-api"
import { InputValidator, InputValidatorGroup, InputValidatorGroupProps, ItemSelect, ProductListItem, TextEditor, Validators } from "@whub/wui"
import _ from "lodash"
import React from "react"

export function AddProductStepTwo(props: InputValidatorGroupProps) {
  const p: Product = {
    attachments: [],
    details: [],
    id: 1,
    images: [ { id: 1, url: "assets/images/logo.png" } ],
    name: 'prova',
    relatedProducts: [],
    tags: [],
    variants: [],
    category: { id: 1, name: 'rrrr', products: [] },
  }

  return (
    <InputValidatorGroup
      onSuccess={props.onSuccess}
      onError={props.onError}
    >
      <InputValidator
        name="description"
        validators={[Validators.max(4096)]}
      >
        <TextEditor
          label="Descrizione"
          maxCharacters={4096}
        />
      </InputValidator>
      <InputValidator
        mode="manual"
        name="variants"
        value={[] as Product[]}
      >
        {
          i =>
            <ItemSelect
              maxHeight={200}
              value={i.value}
              onChange={items => i.onChange?.({ target: { value: items } })}
              options={[p]}
              groupBy={(option) => option.category?.name ?? 'Altro'}
              getOptionLabel={(option) => option.name}
              renderOption={(props, option, isAlreadyIn, onAdd) => (
                <ProductListItem
                  key={_.uniqueId()}
                  listItemProps={{
                    ...props,
                    onClick: (e: Event) => e.preventDefault()
                  }}
                  product={option}
                >
                  <Button
                    disabled={isAlreadyIn}
                    variant="text"
                    onClick={e => onAdd(option)}
                  >
                    Aggiungi
                  </Button>
                </ProductListItem>
              )}
              renderInput={(params) =>
                <TextField
                  {...params}
                  error={i.error}
                  disabled={i.disabled}
                  size="small"
                  variant="outlined"
                  label="Prodotti correlati"
                  color="secondary"
                />
              }
            >
              {
                (option, i, onRemove, isLast) =>
                  <React.Fragment key={i}>
                    <ProductListItem
                      product={option}
                    >
                      <Box pr={1}>
                        <IconButton
                          onClick={() => onRemove(option)}
                        >
                          <CloseRounded/>
                        </IconButton>
                      </Box>
                    </ProductListItem>
                    {!isLast && <Divider sx={{ marginBlock: 1 }}/>}
                  </React.Fragment>
              }
            </ItemSelect>
        }
      </InputValidator>
    </InputValidatorGroup>
  )
}
