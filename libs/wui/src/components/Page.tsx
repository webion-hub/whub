import { Box, SxProps, Theme, useTheme } from "@mui/material";
import React, { ReactNode } from "react";

export interface PageProps {
  readonly centered?: boolean,
  readonly sx?: SxProps<Theme>,
  readonly children: ReactNode,
}

export const Page = React.forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        flex: props.centered ? 'none' : 1,
        ...props.sx,
      }}
    >
      {props.children}
    </Box>
  );
});

Page.defaultProps = {
  centered: false
}
