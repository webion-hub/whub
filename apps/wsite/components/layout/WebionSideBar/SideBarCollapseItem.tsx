import { Collapse, List } from "@mui/material";
import { ChildrenProp } from "@wui/core";
import { SideBarItem } from "@wui/layout/Sidebar";
import { ReactNode, useState } from "react";

interface SideBarCollapseItemProps {
  readonly children: ReactNode;
  readonly main: {
    text: string;
    icon: ChildrenProp;
  };
}

export function SideBarCollapseItem(props: SideBarCollapseItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SideBarItem
        text={props.main.text}
        icon={props.main.icon}
        onClick={() => setOpen(!open)}
        stayOpenOnClick
      />
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          sx={{
            background: '#0000000d',
          }}
        >
          {props.children}
        </List>
      </Collapse>
    </>
  );
}