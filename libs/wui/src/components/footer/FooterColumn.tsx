import { Stack, StackProps } from "@mui/material";
import React from "react";
import { ChildrenProp } from "../../abstractions/props/ChildrenProps";
import { Props } from "../../lib/Props";

export interface FooterColumnProps {
  readonly StackProps?: StackProps;
  readonly children: ChildrenProp;
  readonly width?: string | number;
}

export const FooterColumn = React.forwardRef<HTMLDivElement, FooterColumnProps>((props, ref) => {
  const stackProps = Props.setObjectDefaultProps(
    {
      direction: "column",
      alignItems: "baseline",
      justifyContent: "left",
      spacing: 1,
    },
    props.StackProps
  );

  return (
    <Stack
      ref={ref}
      {...stackProps}
      sx={{
        maxWidth: props.width,
        width: "100%",
        height: "100%",
        "& > button": {
          justifyContent: stackProps.alignItems,
        },
        "& > a": {
          justifyContent: stackProps.alignItems,
        },
      }}
    >
      {props.children}
    </Stack>
  );
})