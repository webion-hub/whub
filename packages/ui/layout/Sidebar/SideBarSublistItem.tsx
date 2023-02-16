import { Link, ListItem, ListItemIcon, ListItemText, SxProps, Theme } from "@mui/material";
import { ChildrenProp } from "@webion/ui-core";
import React from 'react';
import { useLayout } from "../Layout/Layout";

export interface SideBarSublistItemProps {
  text: string;
  sx?: SxProps<Theme>;
  icon: ChildrenProp;
  href?: string;
  onClick: (e: Event) => void;
  stayOpenOnClick?: boolean;
}

export const SideBarSublistItem = React.forwardRef<HTMLDivElement, SideBarSublistItemProps>((props, _ref) => {
  const { setSiebarStatus } = useLayout();

  return (
    <ListItem
      button
      component={Link}
      href={props.href}
      onClick={(e: any) => {
        props.onClick(e);

        if (!props.stayOpenOnClick)
          setSiebarStatus(false);
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

SideBarSublistItem.displayName = "SideBarSublistItem"