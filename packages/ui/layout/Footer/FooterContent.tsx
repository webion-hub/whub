import { Stack } from "@mui/material";
import { ChildrenProps } from "@webion/ui-core";

export function FooterContent(props: ChildrenProps) {
  return (
    <Stack
      direction={{md: "row", xs: 'column'}}
      justifyContent="center"
      alignItems="center"
      sx={{
        width: '100%',
        paddingInline: 2,
        paddingBlock: 4,
        margin: "0 auto",
      }}
    >
      {props.children}
    </Stack>
  );
}
