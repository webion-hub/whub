import React, { useRef } from "react"
import { useTheme, Button, TextField, Stack, Divider, Autocomplete } from "@mui/material";

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { Dropdown } from "../Dropdown";
import _ from "lodash";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

export interface CategorySearchBarProps<T, G> {
  readonly loading: boolean,
  readonly label: string,
  readonly options: T[],
  readonly categories: G[],
  readonly defaultCategory?: G,
  readonly onSearch?: () => void,
  readonly onValueChange?: (value: string) => void,
  readonly onCategoryChange?: (category: G) => void,
  readonly getCategoryOptionLabel: (option: G) => string,
  readonly getCategoryValue: (option: G) => string,
  readonly groupBy?: (option: T) => string,
  readonly getOptionLabel?: (option: T | string) => string,
  readonly onOpen?: () => void,
  readonly children: (props: React.HTMLAttributes<HTMLLIElement>, option: T, onClose: () => void) => JSX.Element,
}

export function CategorySearchBar<T, G>(props: CategorySearchBarProps<T, G>) {
  const ref = useRef<HTMLDivElement>()
  const { t } = useTranslation()
  const theme = useTheme()
  const [focusCategory, setFocusCategory] = React.useState<boolean>(false);
  const [focusAutocomplete, setFocusAutocomplete] = React.useState<boolean>(false);
  const [hover, setHover] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const focus = focusAutocomplete || focusCategory

  const getColor = () => {
    if(focus)
      return `${theme.palette.primary.main} !important`

    if(hover)
      return '#000'

    return 'auto'
  }

  const onClose = () => {
    setOpen(false)
    setHover(false)
    setFocusAutocomplete(false)
    setFocusCategory(false);
    (document.activeElement as HTMLElement).blur();
  }

  return (
    <Stack
      ref={ref}
      onSubmit={(e: any) => {
        e.preventDefault()
        props.onSearch?.()
        setOpen(false)
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
        value={props.defaultCategory}
        getValue={props.getCategoryValue}
        getOptionLabel={props.getCategoryOptionLabel}
        variant="outlined"
        size="small"
        label={t('category')}
        focused={focusCategory}
        elements={props.categories}
        disabled={props.loading}
        onFocus={() => {
          setFocusCategory(true)
          setFocusAutocomplete(false)
        }}
        onBlur={() => setFocusCategory(false)}
        onMouseEnter={() => !focus && setHover(true)}
        onMouseLeave={() => !focus && setHover(false)}
        onValueChange={v => props.onCategoryChange?.(v)}
        sx={{ maxWidth: 180, width: '100%' }}
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
        open={open}
        fullWidth
        freeSolo
        filterOptions={options => options}
        options={props.options}
        groupBy={props.groupBy}
        getOptionLabel={props.getOptionLabel}
        loading={props.loading}
        onOpen={() => props.onOpen?.()}
        onFocus={() => {
          setOpen(true)
          setFocusAutocomplete(true)
          setFocusCategory(false)
        }}
        onBlur={() => {
          setOpen(false)
          setFocusAutocomplete(false)
        }}
        onMouseEnter={() => !focus && setHover(true)}
        onMouseLeave={() => !focus && setHover(false)}
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
        renderOption={(propsOptions, option) =>
          props.children(propsOptions, option, () => onClose())
        }
        renderInput={(params) => (
          <TextField
            {...params}
            focused={focusAutocomplete}
            onChange={e => props.onValueChange?.(e.target.value)}
            variant="outlined"
            size="small"
            label={props.label}
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
        aria-label="search"
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
