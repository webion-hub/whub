import { Stack, StackProps, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { ChildrenProp } from "../../abstractions/props/ChildrenProps";
import { ColorUtils } from "../../lib/ColorUtils";

export interface FooterGridProps extends StackProps {
  readonly children?: ChildrenProp;
  readonly width?: string | number;
  readonly height?: string | number;
  readonly showBorder?: boolean;
  readonly borderColor?: string;
}

export const FooterGrid = React.forwardRef<HTMLDivElement, FooterGridProps>((props, ref) => {
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
      ref={ref}
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
})

FooterGrid.defaultProps = {
  direction: "column",
  alignItems: "baseline",
  justifyContent: "left",
  height: '100%',
  width: '100%',
}

export const FooterRow = React.forwardRef<HTMLDivElement, FooterGridProps>((props, ref) => {
  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  const {
    ref: _ref,
    ...others
  } = props

  return (
    <FooterGrid
      ref={ref}
      {...others}
      direction={isMd ? "column" : "row"}
      height={isMd ? 'auto' : others.height}
    >
      {props.children}
    </FooterGrid>
  )
})

export const FooterColumn = React.forwardRef<HTMLDivElement, FooterGridProps>((props, ref) => {
  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  const {
    ref: _ref,
    ...others
  } = props

  return (
    <FooterGrid
      ref={ref}
      {...others}
      direction="column"
      width={isMd ? '100%' : others.width}
    >
      {props.children}
    </FooterGrid>
  )
})
