import { AppBar as MuiAppBar } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import { BaseProps } from "../../abstractions/props/BaseProps";

export const AppBar = React.forwardRef<HTMLDivElement, BaseProps>((props, ref) => {
  return (
    <MuiAppBar ref={ref} position="fixed" sx={props.sx}>
      <Toolbar>{props.children}</Toolbar>
    </MuiAppBar>
  );
});