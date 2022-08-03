import Page from "../Page";
import React from "react";
import CookiePopup from "../cookie_popup/CookiePopup";
import { ChildrenProps, useLanguage } from "@whub/wui";
import WebionSideBar from "./WebionSideBar";
import WebionAppbar from "./WebionAppBar";
import WebionFooter from "./WebionFooter";
import { Backdrop, CircularProgress, Grid } from "@mui/material";

const Layout = React.forwardRef<HTMLDivElement, ChildrenProps>((props, ref) => {
  const { t, loading } = useLanguage()
  
  document.title = t('tab-title')

  return (
    <>
      <WebionSideBar/>
      <WebionAppbar/>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
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