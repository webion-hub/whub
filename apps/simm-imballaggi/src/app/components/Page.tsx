import { Box } from "@mui/material";
import { BaseProps } from "@whub/wui";
import React from "react";

const Page = React.forwardRef<HTMLDivElement, BaseProps>((props, ref) => {

  return (
    <Box
      ref={ref}
      sx={{
        background: (theme) => theme.palette.background.default,
        ...props.sx,
      }}
    >
      {props.children}
    </Box>
  );
});

export default Page