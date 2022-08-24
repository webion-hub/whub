import React, { useRef } from "react"
import { useTheme, Button, TextField, Stack, Divider, Autocomplete, Typography } from "@mui/material";

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Img } from "../Img";
import { Dropdown } from "../Dropdown";
import { ProductListItem } from "./ProductListItem";
import { Product } from "@whub/wshop-api";
import _ from "lodash";

export interface CategorySearchBarProps {
  readonly filter: string,
  readonly elements: string[],
}

export function CategorySearchBar(props: CategorySearchBarProps) {
  const ref = useRef<HTMLDivElement>()
  const theme = useTheme()
  const [focus, setFocus] = React.useState<boolean>(false);
  const [hover, setHover] = React.useState<boolean>(false);

  const getColor = () => {
    if(focus)
      return `${theme.palette.primary.main} !important`

    if(hover)
      return '#000'

    return 'auto'
  }

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
    <Stack
      ref={ref}
      direction="row"
      sx={{ width: '100%' }}
      divider={
        <Divider
          orientation="vertical"
          flexItem
          sx={{ marginBlock: 0.5 }}
        />
      }
    >
      <Dropdown
        variant="outlined"
        size="small"
        label="Categoria"
        elements={[
          'Reggiatrici',
          'Marcatori'
        ]}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        sx={{ minWidth: 120 }}
        selectSx={{
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          'fieldset': {
            borderRight: 'none',
            borderWidth: focus ? '2px' : 'auto',
            borderColor: getColor(),
          }
        }}
      />
      <Autocomplete
        fullWidth
        options={[p]}
        groupBy={(option) => option.category?.name ?? 'Altro'}
        getOptionLabel={(option) => option.name}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        componentsProps={{
          popper: {
            anchorEl: ref.current,
            sx: {
              width: `${ref.current?.offsetWidth}px !important`
            }
          }
        }}
        sx={{
          marginLeft: '-1px',
          marginRight: '-1px',
        }}
        renderOption={(props, option) => (
          <ProductListItem
            key={_.uniqueId()}
            listItemProps={props}
            product={option}
          >
            <Button
              variant="text"
            >
              Vedi
            </Button>
          </ProductListItem>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            size="small"
            label="Cerca prodotto"
            sx={{
              '.MuiOutlinedInput-root': {
                borderRadius: 0,
                'fieldset': {
                  borderInline: 'none',
                  borderWidth: focus ? '2px' : 'auto',
                  borderColor: getColor(),
                }
              }
            }}
          />
        )}
      />
      <Button
        variant="contained"
        sx={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          boxShadow: 'none !important'
        }}
      >
        <SearchRoundedIcon/>
      </Button>
    </Stack>
  )
}
