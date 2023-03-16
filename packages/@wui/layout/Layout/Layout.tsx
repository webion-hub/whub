import { styled, SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import MaybeShow from '@wui/components/MaybeShow';
import { Utils } from '@wui/core';
import { Router, useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

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

export function Layout(props: LayoutProps) {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const [section, setSection] = useState<string>();
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const handleRouteChange = () => {
    setLoading(true);
  };

  const handleRouteChangeComplete = () => {
    setLoading(false);
  };

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeComplete);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.on('routeChangeError', handleRouteChangeComplete);
    };
  }, [router]);

  const toggleSideBar = () => {
    setOpenSidebar(status => !status)
  }

  return (
    <LayoutContext.Provider
      value={{
        setSection,
        setLoading,
        toggleSideBar,
        setSiebarStatus: setOpenSidebar,
        currentSection: section,
        loading,
        isSidebarOpen: openSidebar
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
              position: 'fixed',
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

export const useLayout = () => useContext(LayoutContext);
