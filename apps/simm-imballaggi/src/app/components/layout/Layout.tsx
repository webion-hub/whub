import Page from "../Page";
import React from "react";
import { ChildrenProps, useLanguage } from "@whub/wui";
import SimmSideBar from "./SimmSideBar";
import SimmAppbar from "./SimmAppBar";
import SimmFooter from "./SimmFooter";
import { Grid } from "@mui/material";

const Layout = React.forwardRef<HTMLDivElement, ChildrenProps>((props, ref) => {
  const { t } = useLanguage()
  
  document.title = t('tab-title')

  return (
    <>
      <SimmSideBar/>
      <SimmAppbar/>
      <Page ref={ref}>
        <Grid 
          container
          direction="column"
          justifyContent="space-between"
          sx={{ minHeight: "100vh" }}
        >
          {props.children}
          <SimmFooter/>
        </Grid>
      </Page>
    </>
  );
});

export default Layout
