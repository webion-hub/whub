import { CloseRounded } from "@mui/icons-material"
import { Box, Button, CircularProgress, Divider, IconButton, TextField } from "@mui/material"
import { useShopApi } from "@whub/apis-react"
import { Product } from "@whub/wshop-api"
import { InputBaseProps, ItemSelect } from "@whub/wui"
import _ from "lodash"
import React, { useState } from "react"
import { ProductListItem } from "./ProductListItem"

export interface CorrelatedProductsSelectProps extends InputBaseProps<Product[]> {
  readonly avoidId?: number
}

export function CorrelatedProductsSelect(props: CorrelatedProductsSelectProps) {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const shopApi = useShopApi()

  const fetchProducts = () => {
    setLoading(true)
    shopApi.products
      .list()
      .then(res =>
        setProducts(res.data.filter(p => p.id !== props.avoidId))
      )
      .finally(() => setLoading(false))
  }

  return (
    <ItemSelect
      loading={loading}
      onOpen={fetchProducts}
      maxHeight={200}
      value={props.value}
      onChange={items => props.onChange?.({ target: { value: items } })}
      options={products}
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
            onClick={() => onAdd(option)}
          >
            Aggiungi
          </Button>
        </ProductListItem>
      )}
      renderInput={(params) =>
        <TextField
          {...params}
          error={props.error}
          disabled={props.disabled}
          size="small"
          variant="outlined"
          label="Prodotti correlati"
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
    >
      {
        (option, i, onRemove, isLast) =>
          <React.Fragment key={i}>
            <ProductListItem
              product={option}
              sx={{ paddingLeft: 1 }}
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
  )
}
