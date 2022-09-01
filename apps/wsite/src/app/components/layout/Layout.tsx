import Page from "../Page";
import React, { createContext } from "react";
import CookiePopup from "../cookie_popup/CookiePopup";
import { ChildrenProps, FullScreenLoading, useLanguage } from "@whub/wui";
import WebionSideBar from "./WebionSideBar";
import WebionAppbar from "./WebionAppBar";
import WebionFooter from "./WebionFooter";
import { Backdrop, CircularProgress, Grid } from "@mui/material";

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

const Layout = React.forwardRef<HTMLDivElement, ChildrenProps>((props, ref) => {
  const { t, loading } = useLanguage()

  document.title = t('tab-title')

  return (
    <>
      <WebionSideBar/>
      <WebionAppbar/>
      <FullScreenLoading loading={loading}/>
      <Page ref={ref}>
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          sx={{ minHeight: "100vh" }}
        >
          {props.children}
          <WebionFooter/>
        </Grid>
      </Page>
      <CookiePopup/>
    </>
  );
});

export default Layout
