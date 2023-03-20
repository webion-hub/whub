import {
  Link,
  ListItem,
  ListItemIcon,
  ListItemText,
  SxProps,
  Theme,
} from '@mui/material';
import { ChildrenProp } from '@wui/core';
import React from 'react';
import { useLayout } from '../Layout/Layout';

export interface SideBarItemProps {
  text: string;
  icon: ChildrenProp;
  sx?: SxProps<Theme>;
  href?: string;
  onClick: (e: any) => void;
  stayOpenOnClick?: boolean;
}

export const SideBarItem = React.forwardRef<HTMLDivElement, SideBarItemProps>((props, _ref) => {
    const { setSiebarStatus } = useLayout();

    return (
      <ListItem
        button
        sx={props.sx}
        component={Link}
        href={props.href}
        onClick={(e: any) => {
          props.onClick(e);

          if (!props.stayOpenOnClick)
            setSiebarStatus(false);
        }}
      >
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText primary={props.text} />
      </ListItem>
    );
  }
);

SideBarItem.displayName = "SideBarItem"