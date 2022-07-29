import { Box, Stack } from "@mui/material";
import React from "react";
import { ChildrenProp, ChildrenProps } from "../../abstractions/props/ChildrenProps";
import { AppBarSectionProps } from "./AppBarSection";

export const AppBarContent = React.forwardRef<HTMLDivElement, ChildrenProps>((props, ref) => {
  const startSection: ChildrenProp = [];
  const endSection: ChildrenProp = [];

  React.Children.map(props.children, (child) => {
    const childProps = child?.props as AppBarSectionProps;

    const section = {
      start: startSection,
      end: endSection,
      center: null,
      "": null,
    }[childProps.alignment ?? ''];

    if (!child) return;

    section?.push(child);
  });

  return (
    <Box
      ref={ref}
      sx={{
        width: "1170px",
        maxWidth: "1170px !important",
        margin: "auto",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {startSection}
      </Stack>
      {endSection}
    </Box>
  );
});