import React, { useRef } from "react"
import { useTheme, Button, TextField, Stack, Divider, Autocomplete } from "@mui/material";

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Dropdown } from "../Dropdown";
import _ from "lodash";

export interface CategorySearchBarProps<T, G> {
  readonly loading: boolean,
  readonly options: T[],
  readonly categories: G[],
  readonly getCategoryOptionLabel: (option: G) => string,
  readonly getCategoryValue: (option: G) => string,
  readonly onCategoryChange?: (category: G) => void,
  readonly groupBy?: (option: T) => string,
  readonly getOptionLabel?: (option: T) => string,
  readonly onOpen?: () => void,
  readonly onCategoryOpen?: () => void,
  readonly children: (props: React.HTMLAttributes<HTMLLIElement>, option: T) => JSX.Element,
}

export function CategorySearchBar<T, G>(props: CategorySearchBarProps<T, G>) {
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
        getValue={props.getCategoryValue}
        getOptionLabel={props.getCategoryOptionLabel}
        variant="outlined"
        size="small"
        label="Categoria"
        elements={props.categories}
        disabled={props.loading}
        onOpen={props.onCategoryOpen}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onValueChange={v => props.onCategoryChange?.(v)}
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
        options={props.options}
        groupBy={props.groupBy}
        getOptionLabel={props.getOptionLabel}
        loading={props.loading}
        onOpen={() => props.onOpen?.()}
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
        renderOption={props.children}
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
