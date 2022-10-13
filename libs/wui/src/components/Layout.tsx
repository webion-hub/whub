import { Box, Stack, styled, SxProps, Theme } from '@mui/material';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useLanguage } from '../contexts/ContextLanguage';
import { Utils } from '../lib/Utils';

interface LayoutContextProps {
  readonly setAppBarStatus: (status: boolean) => void;
  readonly setFooterStatus: (status: boolean) => void;
  readonly setSidebarStatus: (status: boolean) => void;
  readonly setSection: (section: string) => void;
  readonly currentSection: string;
}

const LayoutContext = createContext<LayoutContextProps>({
  setAppBarStatus: () => {
    return;
  },
  setFooterStatus: () => {
    return;
  },
  setSidebarStatus: () => {
    return;
  },
  setSection: () => {
    return;
  },
  currentSection: '',
});

const Main = styled('main')({})

export interface LayoutProps {
  readonly AppBarComponent?: ReactNode;
  readonly FooterComponent?: ReactNode;
  readonly SidebarComponent?: ReactNode;
  readonly sx?: SxProps<Theme>;
  readonly children: ReactNode;
}

export const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  (props, ref) => {
    const [appBarState, setAppBarState] = useState(true);
    const [footerState, setFooterState] = useState(true);
    const [sideBarState, setSidebarState] = useState(true);
    const [section, setSection] = useState('');

    return (
      <LayoutContext.Provider
        value={{
          setAppBarStatus: setAppBarState,
          setFooterStatus: setFooterState,
          setSidebarStatus: setSidebarState,
          setSection: setSection,
          currentSection: section,
        }}
      >
        <Stack
          direction="column"
          justifyContent="space-between"
          sx={{ minHeight: '100vh' }}
        >
          <Box />
          {sideBarState && props.SidebarComponent}
          {appBarState && props.AppBarComponent}
          <Main
            sx={{
              marginTop: theme => Utils.getWidth(theme.mixins.toolbar.height ?? 0),
              display: 'flex',
              flex: '1 1',
              "& > *": {
                width: '100%'
              },
              ...props.sx,
            }}
          >
            {props.children}
          </Main>
          {footerState && props.FooterComponent}
        </Stack>
      </LayoutContext.Provider>
    );
  }
);

export const useLayout = () => useContext(LayoutContext);
