import { Stack, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { ChildrenProp } from "../../abstractions/props/ChildrenProps";
import { MaybeShow } from "../conditional_components/MaybeShow";
import { FooterColumnProps } from "./FooterColumn";

export interface FooterContentProps {
  readonly children?: ChildrenProp;
  readonly disableAutoAlign?: boolean;
  readonly width?: number | string;
}

export const FooterContent = React.forwardRef<HTMLDivElement, FooterContentProps>((props, ref) => {
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
        maxWidth: props.width,
        width: '100%',
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
        <MaybeShow
          show={!props.disableAutoAlign}
          alternativeChildren={props.children}
        >
          <>{childrenWithProps}</>
        </MaybeShow>
      </Stack>
    </Stack>
  );
})

FooterContent.defaultProps = {
  disableAutoAlign: false,
  width: 1270
}
