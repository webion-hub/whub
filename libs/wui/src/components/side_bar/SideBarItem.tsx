import {
  Link,
  ListItem,
  ListItemIcon,
  ListItemText,
  SxProps,
  Theme,
} from "@mui/material";
import { ChildrenProp } from "../../abstractions/props/ChildrenProps";
import { useSidebar } from "../../hooks/useSideBar";
import React from "react";

export interface SideBarItemProps {
  text: string;
  icon: ChildrenProp;
  sx?: SxProps<Theme>;
  href?: string;
  onClick: (e: Event) => void;
  stayOpenOnClick?: boolean;
}

export const SideBarItem = React.forwardRef<HTMLDivElement, SideBarItemProps>((props, _ref) => {
  const { setSideBarOpen } = useSidebar();

  return (
    <ListItem
      button
      sx={props.sx}
      component={Link}
      href={props.href}
      onClick={(e: any) => {
        props.onClick(e);
        if (!props.stayOpenOnClick) setSideBarOpen(false);
      }}
    >
      <ListItemIcon>{props.icon}</ListItemIcon>
      <ListItemText primary={props.text} />
    </ListItem>
  );
})