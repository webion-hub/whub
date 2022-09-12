import { MenuRounded } from "@mui/icons-material";
import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import { ChildrenProp } from "../../abstractions/props/ChildrenProps";
import { useSidebar } from "../../hooks/useSideBar";

export interface SideBarButtonProps {
  readonly visible?: boolean;
  readonly children?: ChildrenProp
  readonly color?: "inherit" | "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"
}

export function SideBarButton(props: SideBarButtonProps) {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));
  const { toggleSidebar } = useSidebar();

  if (isMobileView && !props.visible)
    return (
      <IconButton
        onClick={toggleSidebar}
        color={props.color}
      >
        {props.children}
      </IconButton>
    );

  return null;
}

SideBarButton.defaultProps = {
  visible: false,
  color: 'primary',
  children: <MenuRounded/>
};
