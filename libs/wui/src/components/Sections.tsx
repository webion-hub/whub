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
        width: "100%",
        marginTop: theme.mixins.toolbar.height + 'px',
        "& > section::before": {
          display: "block",
          content: "''",
          marginTop: "-" + theme.mixins.toolbar.height + "px",
          height: theme.mixins.toolbar.height + "px",
          visibility: "hidden",
        },
        ...props.sx,
      }}
    >
      {props.children}
    </Box>
  );
})
