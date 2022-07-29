import { useTheme } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { ChildrenProps } from "../../abstractions/props/ChildrenProps";

const StyledFooter = styled("footer")({});

export const Footer = React.forwardRef<HTMLDivElement, ChildrenProps>((props, ref) => {
  const theme = useTheme();

  return (
    <StyledFooter
      ref={ref}
      sx={{
        background: theme.palette.common.black,
        color: theme.palette.text.primary,
      }}
    >
      {props.children}
    </StyledFooter>
  );
});

