import React, { ReactNode } from "react";
import { Box, Stack, useTheme } from "@mui/material";
import { useLanguage } from "../hooks/useLanguage";

export interface LayoutProps {
  readonly AppBarComponent?: ReactNode,
  readonly FooterComponent?: ReactNode,
  readonly SidebarComponent?: ReactNode,
  readonly children: ReactNode,
}

export const Layout = React.forwardRef<HTMLDivElement, LayoutProps>((props, ref) => {
  const theme = useTheme()
  const { t } = useLanguage()

  document.title = t('tab-title')

  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      sx={{ minHeight: '100vh' }}
    >
      <Box/>
      {props.SidebarComponent}
      {props.AppBarComponent}
      {props.children}
      {props.FooterComponent}
    </Stack>
  );
});
