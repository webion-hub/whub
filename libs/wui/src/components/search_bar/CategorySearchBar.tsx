import React from "react"
import { Grid, useTheme, Button, SxProps, Theme, OutlinedInput, FormControl, Select, MenuItem, SelectChangeEvent } from "@mui/material";

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

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

const CategorySearchBar = React.forwardRef<HTMLDivElement, CategorySearchBarProps>((props, ref) => {
  const theme = useTheme()

  return (
    <Grid
      component="form"
      container
      alignItems="center"
    >
      <OutlinedInput
        color="secondary"
        sx={{ 
          marginLeft: 1, 
          flex: 1, 
          paddingInline: 0,
          "& > .search-adorment": {
            height: 40
          }
        }}
        inputProps={{ 
          sx: {
            paddingLeft: 2,
            backgroundColor: theme.palette.background.default
          } 
        }}
        placeholder="Cerca prodotto"
        size="small"
        startAdornment={
          <CategoryDropdown
            title={props.filter}
            elements={props.elements}
            sx={{
              background: "#E4E7EB",
              color: "black",
            }}
          />
        }
        endAdornment={
          <Button 
            className="search-adorment"
            type="submit"
            color="primary"
            variant="contained"
            sx={{
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            }}
          >
            <SearchRoundedIcon />
          </Button>
        }
      />
    </Grid>
  )
})

export default CategorySearchBar