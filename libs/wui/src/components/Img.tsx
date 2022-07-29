import { styled } from "@mui/system";
import React from "react";

const StyledImg = styled('img')({});

export const Img = React.forwardRef<HTMLDivElement, any>((props, ref) => {
  return(
    <StyledImg {...props} ref={ref}></StyledImg>
  )
})