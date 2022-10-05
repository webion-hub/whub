import { Stack, StackProps, SxProps, Theme } from "@mui/material";
import { Breakpoint } from "@mui/system";
import React from "react";
import { MaybeShopBaseProps } from "./MaybeShow";
import { Responser } from "./Responser";

interface ResponserGridPropsBase extends MaybeShopBaseProps {
  readonly reverse?: 'both' | 'row' | 'column';
  readonly invert?: boolean;
  readonly sx?: SxProps<Theme>;
  readonly GridProps?: StackProps;
}

export interface ResponserGridLowerUpperProps extends ResponserGridPropsBase {
  readonly type: "upper" | "lower";
  readonly size: number | Breakpoint;
}


export interface ResponserGridBetweenProps extends ResponserGridPropsBase {
  readonly type: "between";
  readonly min: number | Breakpoint;
  readonly max: number | Breakpoint;
}

export type ResponserGridProps = ResponserGridLowerUpperProps | ResponserGridBetweenProps


export const ResponserGrid = React.forwardRef<HTMLDivElement, ResponserGridProps>((props, ref) => {
  const column = props.reverse === 'both' || props.reverse === 'column'
    ? "column-reverse"
    : "column";

  const row = props.reverse === 'both' || props.reverse === 'row'
    ? "row-reverse"
    : "row";

  const gridProps = {
    sx: props.sx,
    ...props.GridProps,
  }

  const alternativeDir = props.invert
    ? row
    : column

  const mainDir = props.invert
    ? column
    : row

  return (
    <Responser
      {...props}
      alternativeChildren={
        <Stack
          {...gridProps}
          direction={alternativeDir}
        >
          {props.children}
        </Stack>
      }
    >
      <Stack
        {...gridProps}
        direction={mainDir}
      >
        {props.children}
      </Stack>
    </Responser>
  );
})
