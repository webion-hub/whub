import { Link, ListItem, ListItemIcon, ListItemText, SxProps, Theme } from "@mui/material";
import { useSidebar } from "../../hooks/useSideBar";
import React from 'react'
import { ChildrenProp } from "../../abstractions/props/ChildrenProps";

export interface SideBarSublistItemProps {
  text: string;
  sx?: SxProps<Theme>;
  icon: ChildrenProp;
  href?: string;
  onClick: (e: Event) => void;
  stayOpenOnClick?: boolean;
}

export const SideBarSublistItem = React.forwardRef<HTMLDivElement, SideBarSublistItemProps>((props, _ref) => {
  const { setSideBarOpen } = useSidebar();

  return (
    <ListItem
      button
      component={Link}
      href={props.href}
      onClick={(e: any) => {
        props.onClick(e);

        if (!props.stayOpenOnClick)
          setSideBarOpen(false);
      }}
    >
      <ListItemIcon>{props.icon}</ListItemIcon>
      <ListItemText
        disableTypography
        primary={props.text}
        sx={{ fontSize: "medium", marginLeft: "60px" }}
      />
    </ListItem>
  );
})
