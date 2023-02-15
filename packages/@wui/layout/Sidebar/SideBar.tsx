import { List, PaperProps, SwipeableDrawer, SxProps, Theme, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { useLayout } from '../Layout/Layout';

export interface SideBarProps {
  readonly children: any;
  readonly sx?: SxProps<Theme>;
  readonly PaperSx?:
    | Partial<PaperProps<'div', Record<string, never>>>
    | undefined;
}

export const SideBar = React.forwardRef<HTMLDivElement, SideBarProps>(
  (props, ref) => {
    const theme = useTheme();
    const isMobileView = useMediaQuery(theme.breakpoints.down('lg'));

    const { isSidebarOpen, setSiebarStatus } = useLayout();

    if (isMobileView)
      return (
        <SwipeableDrawer
          ref={ref}
          PaperProps={props.PaperSx}
          sx={props.sx}
          anchor="right"
          open={isSidebarOpen}
          onClose={(_) => setSiebarStatus(false)}
          onOpen={(_) => setSiebarStatus(true)}
        >
          <List sx={{ height: '100%' }}>{props.children}</List>
        </SwipeableDrawer>
      );

    return null;
  }
);

SideBar.displayName = "SideBar"