import { Box, Stack } from "@mui/material";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { useTranslation } from "react-i18next";

interface LayoutContextProps {
  readonly setAppBarStatus: (status: boolean) => void,
  readonly setFooterStatus: (status: boolean) => void,
  readonly setSidebarStatus: (status: boolean) => void,
}

const LayoutContext = createContext<LayoutContextProps>({
  setAppBarStatus: () => { return },
  setFooterStatus: () => { return },
  setSidebarStatus: () => { return },
})

export interface LayoutProps {
  readonly AppBarComponent?: ReactNode,
  readonly FooterComponent?: ReactNode,
  readonly SidebarComponent?: ReactNode,
  readonly children: ReactNode,
}

export const Layout = React.forwardRef<HTMLDivElement, LayoutProps>((props, ref) => {
  const [ appBarState, setAppBarState ] = useState(true)
  const [ footerState, setFooterState ] = useState(true)
  const [ sideBarState, setSidebarState ] = useState(true)

  const { t } = useTranslation()

  document.title = t('tab-title')

  return (
    <LayoutContext.Provider
      value={{
        setAppBarStatus: setAppBarState,
        setFooterStatus: setFooterState,
        setSidebarStatus: setSidebarState,
      }}
    >
      <Stack
        direction="column"
        justifyContent="space-between"
        sx={{ minHeight: '100vh' }}
      >
        <Box/>
        {sideBarState && props.SidebarComponent}
        {appBarState && props.AppBarComponent}
        {props.children}
        {footerState && props.FooterComponent}
      </Stack>
    </LayoutContext.Provider>
  );
});


export const useLayout = () => useContext(LayoutContext)
