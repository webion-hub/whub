import React from "react"
import { Grid, useTheme, Button, Menu, SxProps, Theme, OutlinedInput } from "@mui/material";

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

export interface CategorySearchBarProps {
  readonly title: string,
}

export interface CategoryDropdownProps {
  readonly sx: SxProps<Theme>,
}

export function CategoryDropdown(props: CategoryDropdownProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        color="inherit"
        onClick={handleClick}
        sx={props.sx}
      >
        Categoria
        <ExpandMoreRoundedIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        VUOTO
      </Menu>
    </>
  );
};

const CategorySearchBar = React.forwardRef<HTMLDivElement, CategorySearchBarProps>((props, ref) => {
  const theme = useTheme()
  return (
    <Grid
      component="form"
      container
      alignItems="center"
      sx={{
        width: 500,
        borderRadius: "8px"
      }}
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
        placeholder="Cerca prodotto"
        size="small"
        startAdornment={
          <CategoryDropdown
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
          >
            <SearchRoundedIcon />
          </Button>
        }
      />
    </Grid>
  )
})

export default CategorySearchBar