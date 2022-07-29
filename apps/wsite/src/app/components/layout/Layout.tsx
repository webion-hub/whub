import Page from "../Page";
import React from "react";
import CookiePopup from "../cookie_popup/CookiePopup";
import { ChildrenProps } from "@whub/wui";
import WebionSideBar from "./WebionSideBar";
import WebionAppbar from "./WebionAppBar";
import WebionFooter from "./WebionFooter";

const Layout = React.forwardRef<HTMLDivElement, ChildrenProps>((props, ref) => {
  return (
    <>
      <WebionSideBar/>
      <WebionAppbar/>
      <Page ref={ref}>
        {props.children}
      </Page>
      <WebionFooter/>
      <CookiePopup/>
    </>
  );
});

export default Layout