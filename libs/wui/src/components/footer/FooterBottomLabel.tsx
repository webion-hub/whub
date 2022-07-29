import { Stack, Typography, TypographyProps } from "@mui/material";
import React from "react";
import { ChildrenProp } from "../../abstractions/props/ChildrenProps";

export interface FooterBottomLabelProps {
  readonly TypographyProps: TypographyProps;
  readonly children: ChildrenProp;
}

export const FooterBottomLabel = React.forwardRef<HTMLDivElement, FooterBottomLabelProps>((props, ref) => {
  return (
    <Stack 
      ref={ref}
      direction="column" 
      alignItems="center" 
      sx={{ padding: 1 }}
    >
      <Typography {...props.TypographyProps}>
        {props.children}
      </Typography>
    </Stack>
  );
})
