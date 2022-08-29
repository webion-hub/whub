import React, { useRef } from "react"
import { useTheme, Button, TextField, Stack, Divider, Autocomplete } from "@mui/material";

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Dropdown } from "../Dropdown";
import _ from "lodash";

export interface CategorySearchBarProps<T, G> {
  readonly loading: boolean,
  readonly options: T[],
  readonly categories: G[],
  readonly onSearch?: () => void,
  readonly onValueChange?: (value: string) => void,
  readonly onCategoryChange?: (category: G) => void,
  readonly getCategoryOptionLabel: (option: G) => string,
  readonly getCategoryValue: (option: G) => string,
  readonly groupBy?: (option: T) => string,
  readonly getOptionLabel?: (option: T | string) => string,
  readonly onOpen?: () => void,
  readonly children: (props: React.HTMLAttributes<HTMLLIElement>, option: T) => JSX.Element,
}

export function CategorySearchBar<T, G>(props: CategorySearchBarProps<T, G>) {
  const ref = useRef<HTMLDivElement>()
  const theme = useTheme()
  const [focusCategory, setFocusCategory] = React.useState<boolean>(false);
  const [focusAutocomplete, setFocusAutocomplete] = React.useState<boolean>(false);
  const [hover, setHover] = React.useState<boolean>(false);
  const focus = focusAutocomplete || focusCategory

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
      onSubmit={(e: any) => {
        e.preventDefault()
        props.onSearch?.()
      }}
      component="form"
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
        focused={focusCategory}
        elements={props.categories}
        disabled={props.loading}
        onFocus={() => {
          setFocusCategory(true)
          setFocusAutocomplete(false)
        }}
        onBlur={() => setFocusCategory(false)}
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
        freeSolo
        filterOptions={options => options}
        options={props.options}
        groupBy={props.groupBy}
        getOptionLabel={props.getOptionLabel}
        loading={props.loading}
        onOpen={() => props.onOpen?.()}
        onFocus={() => {
          setFocusAutocomplete(true)
          setFocusCategory(false)
        }}
        onBlur={() => setFocusAutocomplete(false)}
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
            focused={focusAutocomplete}
            onChange={e => props.onValueChange?.(e.target.value)}
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
        type="submit"
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
