import { useMediaQuery } from "@mui/material";
import { Breakpoint, useTheme } from "@mui/system";
import React from "react";
import { MaybeShopBaseProps, MaybeShow } from "./MaybeShow";

export interface ResponserLowerUpperProps extends MaybeShopBaseProps {
  readonly type: "upper" | "lower";
  readonly size: number | Breakpoint;
}

export interface ResponserBetweenProps extends MaybeShopBaseProps {
  readonly type: "between";
  readonly min: number | Breakpoint;
  readonly max: number | Breakpoint;
}

export type ResponserProps = ResponserLowerUpperProps | ResponserBetweenProps

export const Responser = React.forwardRef<HTMLDivElement, ResponserProps>((props, ref) => {
  const theme = useTheme();

  const getUpper = () => {
    return props.type === "upper" ? props.size : 0;
  };

  const getLower = () => {
    return props.type === "lower" ? props.size : 0;
  };

  const getBetween = () => {
    return props.type === "between"
      ? { min: props.min, max: props.max }
      : { min: 0, max: 0 };
  };

  const breakpoint = {
    upper: theme.breakpoints.up(getUpper()),
    lower: theme.breakpoints.down(getLower()),
    between: theme.breakpoints.between(getBetween().min, getBetween().max),
  }[props.type];

  const canShow = useMediaQuery(breakpoint);

  return (
    <MaybeShow 
      show={canShow} 
      alternativeChildren={props.alternativeChildren}
      ref={ref}
    >
      {props.children}
    </MaybeShow>
  );
});