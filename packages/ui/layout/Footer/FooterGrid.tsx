import { Stack, StackProps, useTheme } from "@mui/material";
import { ChildrenProp, ColorUtils } from "@webion/ui-core";

export interface FooterGridProps extends StackProps {
  readonly children?: ChildrenProp;
  readonly width?: string | number;
  readonly height?: string | number;
  readonly showBorder?: boolean;
  readonly borderColor?: string;
}

export function FooterGrid(props: FooterGridProps) {
  const {
    sx,
    children,
    width,
    height,
    showBorder,
    borderColor: borderColorProps,
    ...stack
  } = props

  const theme = useTheme()

  const borderColor =
  borderColorProps ??
    ColorUtils.fade(theme, theme.palette.layout?.footer ?? '', 0.4)


  const borderSx = showBorder
    ? `1px solid ${borderColor}`
    : 'none'

  return (
    <Stack
      {...stack}
      sx={{
        borderLeft: props.direction === 'column' ?  borderSx : 'none',
        borderTop: props.direction === 'row' ?  borderSx : 'none',
        width: width,
        height: height,
        ...sx,
      }}
    >
      {children}
    </Stack>
  );
}

FooterGrid.defaultProps = {
  direction: "column",
  alignItems: "baseline",
  justifyContent: "left",
  height: '100%',
  width: '100%',
}