import { Box, SxProps, Theme, useTheme } from "@mui/material";
import _ from "lodash";
import React, { ReactNode } from "react";
import { FullScreenLoading } from "./FullScreenLoading";

export interface PageProps {
  readonly loading?: boolean,
  readonly centered?: boolean,
  readonly sx?: SxProps<Theme>,
  readonly children: ReactNode,
}

export const Page = React.forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  const theme = useTheme()

  return (
    <>
      <FullScreenLoading loading={!!props.loading}/>
      <Box
        ref={ref}
        sx={{
          position: 'relative',
          flex: props.centered ? 'none' : 1,
          marginTop: theme.mixins.toolbar.height + 'px',
          "& > *": {
            maxWidth: theme => theme.layoutMaxWidth?.section,
            marginInline: 'auto'
          },
          ...props.sx,
        }}
      >
        {props.children}
      </Box>
    </>
  );
});

Page.defaultProps = {
  centered: false
}
