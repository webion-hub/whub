import { Stack, useTheme } from "@mui/material";
import React from "react";
import { ChildrenProps } from "../../abstractions/props/ChildrenProps";

export const Footer = React.forwardRef<HTMLDivElement, ChildrenProps>((props, ref) => {
  const theme = useTheme();

  return (
    <Stack
      ref={ref}
      component="footer"
      direction="column"
      sx={{
        background: theme.palette.layout?.footer,
        color: theme.palette.text.primary,
      }}
    >
      {props.children}
    </Stack>
  );
});

