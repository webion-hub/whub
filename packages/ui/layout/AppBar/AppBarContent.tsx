import { Stack, useMediaQuery, useTheme } from "@mui/material";
import MaybeShow from "@webion/ui-components/MaybeShow";
import { ChildrenProp } from "@webion/ui-core";
import React from "react";
import { AppBarSectionProps } from "./AppBarSection";

interface AppBarWidth {
  readonly mobile: string,
  readonly default: string,
}

export interface AppBarContentProps {
  readonly extremisWidth?: AppBarWidth,
  readonly centerWidth?: AppBarWidth,
  readonly children: ChildrenProp,
}

export const AppBarContent = React.forwardRef<HTMLDivElement, AppBarContentProps>((props, ref) => {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));

  const startSection: ChildrenProp = [];
  const centerSection: ChildrenProp = [];
  const endSection: ChildrenProp = [];

  React.Children.map(props.children, (child) => {
    const childProps = child?.props as AppBarSectionProps;

    const section = {
      start: startSection,
      end: endSection,
      center: centerSection,
      "": null,
    }[childProps.alignment ?? ''];

    if (!child) return;

    section?.push(child);
  });

  const isCenterEmpty = () => {
    return centerSection.length === 0
  }

  const isStartEmpty = () => {
    return startSection.length === 0
  }

  const isEndtEmpty = () => {
    return endSection.length === 0
  }

  const isSomeExtremisEmpty = () => {
    return  isStartEmpty() || isEndtEmpty()
  }

  const isBothExtremisEmpty = () => {
    return  isStartEmpty() && isEndtEmpty()
  }

  const getExtremisWidth = () => {
    if(props.extremisWidth)
      return getWidth(props.extremisWidth)

    if(props.centerWidth)
      return `calc(100% - ${getWidth(props.centerWidth)})`

    if(isCenterEmpty() && isSomeExtremisEmpty())
      return '100%'

    if(isCenterEmpty())
      return '50%'

    return '33%'
  }

  const getCenterWidth = () => {
    if(props.centerWidth)
      return getWidth(props.centerWidth)

    if(props.extremisWidth)
      return `calc(100% - ${getWidth(props.extremisWidth)} - ${getWidth(props.centerWidth)})`

    if(isBothExtremisEmpty())
      return '100%'

    return '33%'
  }

  const getWidth = (width?: AppBarWidth) => {
    if(!width)
      return ''

    return isMobileView
      ? width.mobile
      : width.default
  }

  return (
    <Stack
      ref={ref}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        width: "100%",
      }}
    >
      <MaybeShow
        show={!isStartEmpty()}
      >
        <Stack
          direction="row"
          justifyContent="flex-start"
          width={getExtremisWidth()}
        >
          {startSection}
        </Stack>
      </MaybeShow>
      <MaybeShow
        show={!isCenterEmpty()}
      >
        <Stack
          direction="row"
          justifyContent="center"
          width={getCenterWidth()}
        >
          {centerSection}
        </Stack>
      </MaybeShow>
      <MaybeShow
        show={!isEndtEmpty()}
      >
        <Stack
          direction="row"
          justifyContent="flex-end"
          width={getExtremisWidth()}
        >
          {endSection}
        </Stack>
      </MaybeShow>
    </Stack>
  );
});

AppBarContent.displayName = 'AppBarContent'