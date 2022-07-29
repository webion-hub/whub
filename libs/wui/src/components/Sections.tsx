import { useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { BaseProps } from "../abstractions/props/BaseProps";

export const Sections = React.forwardRef<HTMLDivElement, BaseProps>((props, ref) => {
  const theme = useTheme();

  return (
    <Box
      ref={ref}
      sx={{
        ...props.sx,
        width: "100%",
        "& > section::before": {
          display: "block",
          content: "''",
          marginTop: "-" + theme.mixins.toolbar.minHeight + "px",
          height: theme.mixins.toolbar.minHeight + "px",
          visibility: "hidden",
        },
      }}
    >
      {props.children}
    </Box>
  );
})