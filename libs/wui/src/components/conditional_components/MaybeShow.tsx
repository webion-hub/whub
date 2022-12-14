import React, { ReactElement } from "react";
import { ReactNode } from "react";
import { ChildrenProp } from "../../abstractions/props/ChildrenProps";

export interface MaybeShopBaseProps {
  readonly children: ChildrenProp;
  readonly alternativeChildren?: ChildrenProp | ReactNode;
}

export interface MaybeShowProps extends MaybeShopBaseProps {
  readonly show: boolean;
}

export const MaybeShow = React.forwardRef<HTMLDivElement, MaybeShowProps>((props, _ref) => {
  if (props.show) return props.children as ReactElement;

  return props.alternativeChildren as ReactElement;
})
