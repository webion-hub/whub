import { useMediaQuery, useTheme } from "@mui/material";
import React from "react";

export interface AppBarSectionProps {
  readonly children: any;
  readonly hideOnMobile?: boolean;
  readonly alignment?: "start" | "end" | "center" | "";
}

export const AppBarSection = React.forwardRef<HTMLDivElement, AppBarSectionProps>((props, ref) => {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));

  if (isMobileView && props.hideOnMobile) return null;

  if (props.alignment === "") return props.children;

  return props.children
})

AppBarSection.defaultProps = {
  alignment: "",
  hideOnMobile: false,
};
