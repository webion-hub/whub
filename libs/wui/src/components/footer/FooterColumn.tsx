import { Stack, StackProps, SxProps, useTheme } from "@mui/material";
import { Theme } from "@mui/system";
import React from "react";
import { ChildrenProp } from "../../abstractions/props/ChildrenProps";
import { ColorUtils } from "../../lib/ColorUtils";
import { Props } from "../../lib/Props";

export interface FooterColumnProps {
  readonly StackProps?: StackProps;
  readonly sx?: SxProps<Theme>;
  readonly children?: ChildrenProp;
  readonly width?: string | number;
  readonly showBorder?: boolean;
  readonly borderColor?: string;
}

export const FooterColumn = React.forwardRef<HTMLDivElement, FooterColumnProps>((props, ref) => {
  const theme = useTheme()

   const stackProps = Props.setObjectDefaultProps(
    {
      direction: "column",
      alignItems: "baseline",
      justifyContent: "left",
      spacing: 1,
    },
    props.StackProps
  );

  const borderColor =
    props.borderColor ??
    ColorUtils.fade(theme, theme.palette.layout?.footer ?? '', 0.4)


  const borderSx = props.showBorder
    ? `1px solid ${borderColor}`
    : 'none'

  return (
    <Stack
      ref={ref}
      {...stackProps}
      sx={{
        borderLeft: borderSx,
        maxWidth: props.width,
        width: "100%",
        height: "100%",
        "& > button": {
          justifyContent: stackProps.alignItems,
        },
        "& > a": {
          justifyContent: stackProps.alignItems,
        },
        ...props.sx,
      }}
    >
      {props.children}
    </Stack>
  );
})
