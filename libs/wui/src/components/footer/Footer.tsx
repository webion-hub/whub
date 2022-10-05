import { Stack, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { ChildrenProp } from "../../abstractions/props/ChildrenProps";

const StyledFooter = styled('footer')({})

export interface FoooterProps {
  readonly children: ChildrenProp,
}

export const Footer = React.forwardRef<HTMLDivElement, FoooterProps>((props, ref) => {
  const theme = useTheme();

  return (
    <StyledFooter
      sx={{
        zIndex: 1,
        display: 'flex',
        width: '100%',
        background: theme.palette.layout?.footer,
        color: theme.palette.text.secondary,
      }}
    >
      <Stack
        ref={ref}
        direction="column"
        sx={{
          width: '100%',
          maxWidth: theme => theme.layoutMaxWidth?.footer,
          margin: '0 auto'
        }}
      >
        {props.children}
      </Stack>
    </StyledFooter>
  );
});
