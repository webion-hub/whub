import { Divider, Stack, StackProps, SxProps, Typography, TypographyProps } from "@mui/material";
import { Theme } from "@mui/system";
import React from "react";
import { ChildrenProp } from "../../abstractions/props/ChildrenProps";
import { ColorUtils } from "../../lib/ColorUtils";
import { Props } from "../../lib/Props";

export interface FooterBottomLabelProps {
  readonly TypographyProps?: TypographyProps;
  readonly children?: ChildrenProp;
  readonly DividerSx?: SxProps<Theme>;
  readonly StackProps?: StackProps;
}

export const FooterBottomLabel = React.forwardRef<HTMLDivElement, FooterBottomLabelProps>((props, ref) => {
  const DividerSx = Props.setObjectDefaultProps<SxProps<Theme>>(
    {
      width: "90%",
      margin: 'auto',
      background: theme => ColorUtils.fade(theme, theme.palette['layout'].footer ?? '', 0.4)
    },
    props.DividerSx
  )

  return (
    <Typography {...props.TypographyProps}>
      <Divider
        sx={{
          ...DividerSx,
          position: 'absolute',
          margin: '0px !important',
          transform: 'translateX(-50%)',
          left: '50%',
        }}
      />
      <Stack
        ref={ref}
        direction={{xs: 'column', md: "row"}}
        alignItems="center"
        justifyContent="center"
        spacing={1}
        sx={{
          width: '100%',
          padding: 1,
          textAlign: 'center',
        }}
        {...props.StackProps}
      >
        {props.children}
      </Stack>
    </Typography>
  );
})
