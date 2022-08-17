import React, { useRef } from "react"
import { Grid, useTheme, Button, SxProps, Theme, OutlinedInput, FormControl, Select, MenuItem, SelectChangeEvent, InputLabel, IconButton, TextField, Stack, Divider, Autocomplete, Typography } from "@mui/material";

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { EditOutlined } from "@mui/icons-material";
import { Box } from "@mui/system";
import { Img } from "../Img";

export interface CategorySearchBarProps {
  readonly filter: string,
  readonly elements: string[],
}

export interface CategoryDropdownProps {
  readonly title?: string,
  readonly elements?: string[],
  readonly sx?: SxProps<Theme>,
  readonly onFocus?: () => void,
  readonly onBlur?: () => void,
  readonly onMouseEnter?: () => void,
  readonly onMouseLeave?: () => void,
}

export function CategoryDropdown(props: CategoryDropdownProps) {
  const [category, setCategory] = React.useState<string>("");
  const theme = useTheme()

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel>Categoria</InputLabel>
      <Select
        variant="outlined"
        value={category}
        label="Categoria"
        onChange={handleChange}
        size="small"
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        sx={props.sx}
      >
        {props.elements?.map((el: string, i: number) => (
          <MenuItem
            value={i}
            key={i}
          >
            {el}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

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
      <CategoryDropdown
        elements={[
          'Reggiatrici',
          'Marcatori'
        ]}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        sx={{
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
        options={[
          {
            title: 'Reggiatrice 1',
            src: 'assets/images/logo.png',
            category: 'Reggiatrici',
          },
          {
            title: 'Reggiatrice 2',
            src: 'assets/images/logo.png',
            category: 'Reggiatrici',
          },
          {
            title: 'Marcatore 1',
            src: 'assets/images/logo.png',
            category: 'Marcatori',
          },
          {
            title: 'Marcatore 2',
            src: 'assets/images/logo.png',
            category: 'Marcatori',
          },
        ]}
        groupBy={(option) => option.category}
        getOptionLabel={(option) => option.title}
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
          <Stack
            spacing={2}
            component="li"
            direction="row"
            sx={{
              width: '100%',
              justifyContent: 'space-between !important'
            }}
            {...props}
          >
            <Stack
              spacing={2}
              direction="row"
            >
              <Img
                src={option.src}
                sx={{
                  aspectRatio: 1,
                  height: 48,
                  borderRadius: 1,
                }}
              />
              <Stack
                direction="column"
              >
                <Typography>{option.title}</Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  {option.category}
                </Typography>
              </Stack>
            </Stack>
            <Button
              variant="text"
            >
              Vedi
            </Button>
          </Stack>
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
