import React from "react"
import { Grid, useTheme, Button, SxProps, Theme, OutlinedInput, FormControl, Select, MenuItem, SelectChangeEvent, InputLabel, IconButton } from "@mui/material";

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { EditOutlined } from "@mui/icons-material";

export interface CategorySearchBarProps {
  readonly filter: string,
  readonly elements: string[],
}

export interface CategoryDropdownProps {
  readonly title?: string,
  readonly elements?: string[],
  readonly sx: SxProps<Theme>,
}

export function CategoryDropdown(props: CategoryDropdownProps) {
  const [category, setCategory] = React.useState<string>("");
  const theme = useTheme()

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  return (
    <FormControl sx={{ minWidth: 120 }}>
        <Select
          variant="outlined"
          value={category}
          onChange={handleChange}
          displayEmpty
          size="small"
          sx={{
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            backgroundColor: theme.palette.layout?.footer
          }}
        >
          <MenuItem value="" disabled>
            {props.title}
          </MenuItem>
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

export const CategorySearchBar = React.forwardRef<HTMLDivElement, CategorySearchBarProps>((props, ref) => {
  const theme = useTheme()

  return (
    <Grid
      component="form"
      container
      alignItems="center"
    >
      <EditOutlined></EditOutlined>
      <FormControl
        size="small"
        variant="outlined"
        sx={{
          ".MuiInputLabel-root": {
            paddingLeft: 10,
          },
          "& > * > legend": {
            marginLeft: 10
          }
        }}
      >
        <InputLabel>
          Cerca prodotto
        </InputLabel>
        <OutlinedInput
          sx={{ paddingRight: 0 }}
          label="Cerca prodotto"
          endAdornment={
            <IconButton color="primary">
              <SearchRoundedIcon/>
            </IconButton>
          }
        />
      </FormControl>
    </Grid>
  )
})
