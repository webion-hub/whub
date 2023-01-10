import { Box, LinearProgress, Stack, styled, SxProps, Theme } from '@mui/material';
import { Router } from 'next/router';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Utils } from '../lib/Utils';
import { MaybeShow } from './conditional_components/MaybeShow';

interface LayoutContextProps {
  readonly setSection: (section?: string) => void;
  readonly currentSection?: string;
  readonly loading: boolean;
  readonly setLoading: (status: boolean) => void;
  readonly isSidebarOpen: boolean;
  readonly toggleSideBar: () => void;
  readonly setSiebarStatus: (status: boolean) => void;
}

const LayoutContext = createContext<LayoutContextProps>({
  setSection: () => { return; },
  setLoading: () => { return; },
  toggleSideBar: () => { return; },
  setSiebarStatus: () => { return; },
  isSidebarOpen: false,
  loading: false,
  currentSection: '',
});

const Main = styled('main')({});

export interface LayoutProps {
  readonly AppBarComponent?: ReactNode;
  readonly FooterComponent?: ReactNode;
  readonly SidebarComponent?: ReactNode;
  readonly sx?: SxProps<Theme>;
  readonly children: ReactNode;
}

export const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  (props, ref) => {
    const [openSidebar, setOpenSidebar] = useState<boolean>(false);
    const [section, setSection] = useState<string>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const handleRouteChange = () => {
        setLoading(true);
      };

      const handleRouteChangeComplete = () => {
        setLoading(false);
      };

      Router.events.on('routeChangeStart', handleRouteChange);
      Router.events.on('routeChangeComplete', handleRouteChangeComplete);
      return () => {
        Router.events.off('routeChangeStart', handleRouteChange);
        Router.events.off('routeChangeComplete', handleRouteChangeComplete);
      };
    }, []);

    const toggleSidebar = () => {
      setOpenSidebar(status => !status)
    }

    return (
      <LayoutContext.Provider
        value={{
          setSection: setSection,
          currentSection: section,
          loading,
          setLoading,
          isSidebarOpen: openSidebar,
          setSiebarStatus: setOpenSidebar,
          toggleSideBar: toggleSidebar
        }}
      >
        <Stack
          direction="column"
          justifyContent="space-between"
          sx={{ minHeight: '100vh' }}
        >
          <Box />

          <MaybeShow show={loading}>
            <LinearProgress
              sx={{
                zIndex: 4000,
                position: 'absolute',
                width: '100%',
              }}
            />
          </MaybeShow>

          {props.SidebarComponent}
          {props.AppBarComponent}
          <Main
            sx={{
              marginTop: (theme) =>
                Utils.getWidth(theme.mixins.toolbar.height ?? 0),
              display: 'flex',
              flex: '1 1',
              '& > *': {
                width: '100%',
              },
              ...props.sx,
            }}
          >
            {props.children}
          </Main>
          {props.FooterComponent}
        </Stack>
      </LayoutContext.Provider>
    );
  }
);

export const useLayout = () => useContext(LayoutContext);
