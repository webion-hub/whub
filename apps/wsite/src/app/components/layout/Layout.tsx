import Page from "../Page";
import React from "react";
import CookiePopup from "../cookie_popup/CookiePopup";
import { ChildrenProps } from "@whub/wui";
import WebionSideBar from "./WebionSideBar";
import WebionAppbar from "./WebionAppBar";
import WebionFooter from "./WebionFooter";
import { Box } from "@mui/material";

const Layout = React.forwardRef<HTMLDivElement, ChildrenProps>((props, ref) => {
  return (
    <>
      <WebionSideBar/>
      <WebionAppbar/>
      <Page ref={ref}>
        <Box 
          sx={{
            minHeight: "100vh", 
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          {props.children}
          <WebionFooter/>
        </Box>
      </Page>
      <CookiePopup/>
    </>
  );
});

export default Layout