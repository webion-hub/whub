import { Stack, StackProps, useMediaQuery, useTheme } from "@mui/material";
import { Props } from "../../lib/Props";
import React from "react";

export interface AppBarSectionProps {
  readonly StackProps?: StackProps;
  readonly children: any;
  readonly hideOnMobile?: boolean;
  readonly alignment?: "start" | "end" | "center" | "";
}

export const AppBarSection = React.forwardRef<HTMLDivElement, AppBarSectionProps>((props, ref) => {
  const stackProps = Props.setObjectDefaultProps<StackProps>(
    {
      direction: "row",
      alignItems: "center",
      spacing: 2,
    },
    props.StackProps
  );

  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));

  if (isMobileView && props.hideOnMobile) return null;

  if (props.alignment === "") return props.children;

  return (
    <Stack
      {...stackProps}
      ref={ref}
      width="100%"
    >
      {props.children}
    </Stack>
  );
})

AppBarSection.defaultProps = {
  alignment: "",
  hideOnMobile: false,
};
