import { ReactElement } from "react";
import { ReactNode } from "react";
import { ChildrenProp } from "@webion/ui-core";

export interface MaybeShopBaseProps {
  readonly children: ChildrenProp;
  readonly alternativeChildren?: ChildrenProp | ReactNode;
}

export interface MaybeShowProps extends MaybeShopBaseProps {
  readonly show: boolean;
}

export function MaybeShow(props: MaybeShowProps): ReactElement {
  if (props.show) return props.children as ReactElement;

  return props.alternativeChildren as ReactElement;
}
