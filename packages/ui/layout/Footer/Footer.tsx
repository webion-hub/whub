import '@webion/ui-extensions'
import { Stack, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import { ChildrenProps } from "@webion/ui-core";

const StyledFooter = styled('footer')({})

export function Footer(props: ChildrenProps) {
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
}
