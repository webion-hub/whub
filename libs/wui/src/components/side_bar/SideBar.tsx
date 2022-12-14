import {List, PaperProps, SwipeableDrawer, SxProps, Theme, useMediaQuery, useTheme, } from "@mui/material";
import { ChildrenProp } from "../../abstractions/props/ChildrenProps";
import React from "react";
import { useSidebar } from "../../hooks/useSideBar";

export interface SideBarProps {
  readonly children: ChildrenProp,
  readonly sx?: SxProps<Theme>,
  readonly PaperSx?: Partial<PaperProps<"div", Record<string, never>>> | undefined,
}

export const SideBar = React.forwardRef<HTMLDivElement, SideBarProps>((props, ref) => {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));

  const { isSideBarOpen, setSideBarOpen } = useSidebar();

  if (isMobileView)
    return (
      <SwipeableDrawer
        ref={ref}
        PaperProps={props.PaperSx}
        sx={props.sx}
        anchor="right"
        open={isSideBarOpen}
        onClose={(_) => setSideBarOpen(false)}
        onOpen={(_) => setSideBarOpen(true)}
      >
        <List>{props.children}</List>
      </SwipeableDrawer>
    );

  return null;
})
