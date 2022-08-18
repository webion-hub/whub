import { Box, SxProps, Theme, useTheme } from "@mui/material";
import React, { ReactNode } from "react";

export interface PageProps {
  readonly centered?: boolean,
  readonly sx?: SxProps<Theme>,
  readonly children: ReactNode,
}

export const Page = React.forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  const theme = useTheme()

  return (
    <Box
      ref={ref}
      sx={{
        ...props.sx,
        flex: props.centered ? 'none' : 1,
        marginTop: theme.mixins.toolbar.height + 'px'
      }}
    >
      {props.children}
    </Box>
  );
});

Page.defaultProps = {
  centered: false
}
