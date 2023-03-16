import { ReactElement } from "react";
import { ReactNode } from "react";
import { ChildrenProp } from "@wui/core";

export interface MaybeShopBaseProps {
  readonly children: ChildrenProp;
  readonly alternativeChildren?: ChildrenProp | ReactNode;
}

export interface MaybeShowProps extends MaybeShopBaseProps {
  readonly show: boolean;
}

export const MaybeShow = (props: MaybeShowProps) => {
  if (props.show) return props.children as ReactElement;

  return props.alternativeChildren as ReactElement;
}
