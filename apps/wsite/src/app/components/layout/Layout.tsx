import Page from "../Page";
import React from "react";
import CookiePopup from "../cookie_popup/CookiePopup";
import { ChildrenProps } from "@whub/wui";
import WebionSideBar from "./WebionSideBar";
import WebionAppbar from "./WebionAppBar";
import WebionFooter from "./WebionFooter";
import { Grid } from "@mui/material";

const Layout = React.forwardRef<HTMLDivElement, ChildrenProps>((props, ref) => {
  return (
    <>
      <WebionSideBar/>
      <WebionAppbar/>
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