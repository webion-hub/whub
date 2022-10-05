import { Stack } from "@mui/material";
import React from "react";
import { ChildrenProp } from "../../abstractions/props/ChildrenProps";

export interface FooterContentProps {
  readonly children?: ChildrenProp;
}

export const FooterContent = React.forwardRef<HTMLDivElement, FooterContentProps>((props, ref) => {
  return (
    <Stack
      ref={ref}
      direction={{md: "row", xs: 'column'}}
      justifyContent="center"
      alignItems="center"
      sx={{
        width: '100%',
        paddingInline: 2,
        paddingBlock: 4,
        margin: "0 auto",
      }}
    >
      {props.children}
    </Stack>
  );
})
