import { Divider, Stack, StackProps, SxProps, Typography, TypographyProps } from "@mui/material";
import { Theme } from "@mui/system";
import { ChildrenProp, ColorUtils, Props } from "@wui/core";

export interface FooterBottomLabelProps {
  readonly TypographyProps?: TypographyProps;
  readonly children?: ChildrenProp;
  readonly DividerSx?: SxProps<Theme>;
  readonly StackProps?: StackProps;
}

export function FooterBottomLabel(props: FooterBottomLabelProps) {
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
}
