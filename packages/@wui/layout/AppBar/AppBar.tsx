import { AppBar as MuiAppBar } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { BaseProps } from "@wui/core";
import React from "react";

export const AppBar = React.forwardRef<HTMLDivElement, BaseProps>((props, ref) => {
  return (
    <MuiAppBar
      ref={ref}
      position="fixed"
      sx={{
        background: theme => theme.palette.layout?.appbar,
        ...props.sx,
      }}
    >
      <Toolbar
        sx={{
          width: '100%',
          margin: 'auto',
          maxWidth: theme => theme.layoutMaxWidth?.appbar ?? 'auto'
        }}
      >
        {props.children}
      </Toolbar>
    </MuiAppBar>
  );
});

AppBar.displayName = 'AppBar'