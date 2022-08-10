import { Grid, GridProps } from "@mui/material";
import { useTheme } from "@mui/system";
import React from "react";
import { ChildrenProp } from "../abstractions/props/ChildrenProps";

interface WuiGridPropsSpacing extends GridProps {
  readonly spacing: number,
  readonly autoWidth?: boolean,
  readonly GridItemProps?: GridProps,
  readonly children?: ChildrenProp
}

interface WuiGridPropsNoSpacing extends GridProps {
  readonly spacing?: undefined,
  readonly children?: ChildrenProp
}

export type WuiGridProps = WuiGridPropsSpacing | WuiGridPropsNoSpacing


export function WuiGrid(props: WuiGridProps) {
  const theme = useTheme()
  const numberOfChildren = React.Children.count(props.children)

  const isSpacingSetted = !!props.spacing

  const isInAutoWidth = isSpacingSetted && props.autoWidth
  const isAColumn = props.direction === 'column' || props.direction === 'column-reverse'

  const autoWidth = isAColumn
    ? '100%'
    : `${100 / numberOfChildren}%`

  const width = isInAutoWidth
    ? autoWidth
    : undefined

  const children = React.Children.map(props.children, (child: any, index: number) => {
    if(!isSpacingSetted || numberOfChildren === 1)
      return child

    const spacing = theme.spacing(props.spacing / 2, '!important')
    const noSpacing = theme.spacing(0, '!important')

    const top = index === 0 && isAColumn
      ? noSpacing
      : spacing

    const bottom = index === numberOfChildren - 1 && isAColumn
      ? noSpacing
      : spacing

      const left = index === 0 && !isAColumn
      ? noSpacing
      : spacing

      const right = index === numberOfChildren - 1 && !isAColumn
      ? noSpacing
      : spacing

    return (
      <Grid
        {...props.GridItemProps}
        item
        sx={{
          width: width,
          paddingTop: top,
          paddingBottom: bottom,

          paddingLeft: left,
          paddingRight: right,
          ...props.GridItemProps?.sx,
        }}
      >
        {React.cloneElement(child)}
      </Grid>
    )
  });

  if(isSpacingSetted) {
    const {
      autoWidth,
      GridItemProps,
      children: _,
      ...gridProps
    } = props

    return (
      <Grid
        {...gridProps}
        sx={{
          marginTop: '0px !important',
          marginLeft: '0px !important',
          width: '100% !important',
          ...gridProps.sx,
        }}
      >
        {children}
      </Grid>
    )
  }

  return (
    <Grid {...props}> {children} </Grid>
  )
}
