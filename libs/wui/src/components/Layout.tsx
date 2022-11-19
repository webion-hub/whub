import {
  Box,
  LinearProgress,
  Stack,
  styled,
  SxProps,
  Theme,
} from '@mui/material';
import { Router } from 'next/router';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Utils } from '../lib/Utils';
import { MaybeShow } from './conditional_components/MaybeShow';

interface LayoutContextProps {
  readonly setAppBarStatus: (status: boolean) => void;
  readonly setFooterStatus: (status: boolean) => void;
  readonly setSidebarStatus: (status: boolean) => void;
  readonly setSection: (section?: string) => void;
  readonly currentSection?: string;
  readonly loading: boolean;
  readonly setLoading: (status: boolean) => void;
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
  setLoading: () => {
    return;
  },
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
    const [appBarState, setAppBarState] = useState(true);
    const [footerState, setFooterState] = useState(true);
    const [sideBarState, setSidebarState] = useState(true);
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

    return (
      <LayoutContext.Provider
        value={{
          setAppBarStatus: setAppBarState,
          setFooterStatus: setFooterState,
          setSidebarStatus: setSidebarState,
          setSection: setSection,
          currentSection: section,
          loading,
          setLoading,
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

          {sideBarState && props.SidebarComponent}
          {appBarState && props.AppBarComponent}
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
          {footerState && props.FooterComponent}
        </Stack>
      </LayoutContext.Provider>
    );
  }
);

export const useLayout = () => useContext(LayoutContext);
