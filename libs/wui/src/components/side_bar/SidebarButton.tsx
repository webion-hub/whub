import { MenuRounded } from "@mui/icons-material";
import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import { ChildrenProp } from "../../abstractions/props/ChildrenProps";
import { useSidebar } from "../../hooks/useSideBar";

export interface SideBarButtonProps {
  readonly visible?: boolean;
  readonly children?: ChildrenProp
}

export function SideBarButton(props: SideBarButtonProps) {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));
  const { toggleSidebar } = useSidebar();

  if (isMobileView && !props.visible)
    return (
      <IconButton onClick={toggleSidebar} color="primary">
        {props.children}
      </IconButton>
    );

  return null;
}

SideBarButton.defaultProps = {
  visible: false,
  children: <MenuRounded/>
};
