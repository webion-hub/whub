import { Box, Stack, SxProps, Theme, useTheme } from "@mui/material";
import React, { ReactNode } from "react";

export interface PageProps {
  readonly centered?: boolean,
  readonly sx?: SxProps<Theme>,
  readonly children: ReactNode,
}

export const Page = React.forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  return (
    <Stack
      ref={ref}
      alignItems={props.centered ? 'center' : 'unset'}
      justifyContent={props.centered ? 'center' : 'unset'}
      sx={{
        position: 'relative',
        flex: props.centered ? 'none' : 1,
        ...props.sx,
      }}
    >
      {props.children}
    </Stack>
  );
});

Page.defaultProps = {
  centered: false
}
