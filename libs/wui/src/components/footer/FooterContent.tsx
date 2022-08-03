import { Stack, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { ChildrenProps } from "../../abstractions/props/ChildrenProps";
import { FooterColumnProps } from "./FooterColumn";

export const FooterContent = React.forwardRef<HTMLDivElement, ChildrenProps>((props, ref) => {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));

  const getAlignItems = (index: number) => {
    if (isMobileView) return "center";

    if (index === 0) return "flex-start";

    if (!Array.isArray(props.children)) return;

    if (index === props.children?.length - 1) return "flex-end";

    return "center";
  };

  const childrenWithProps = React.Children.map(
    props.children,
    (child, index) => {
      if (!child) return;

      const footerColumn = child.props as FooterColumnProps;

      return React.cloneElement(child, {
        StackProps: {
          alignItems: getAlignItems(index),
          ...footerColumn.StackProps,
        },
      });
    }
  );

  return (
    <Stack
      ref={ref}
      direction="row"
      justifyContent="center"
      sx={{
        maxWidth: 1270,
        padding: "10px 30px",
        margin: "0 auto",
      }}
    >
      <Stack
        direction={isMobileView ? "column" : "row"}
        justifyContent="space-around"
        alignItems="center"
        spacing={2}
        sx={{
          width: "100%",
          marginTop: 2,
          marginBottom: 2,
          "& > *": {
            width: "100%",
          },
        }}
      >
        {childrenWithProps}
      </Stack>
    </Stack>
  );
})
