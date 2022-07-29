import { ReactElement } from "react"

export interface ChildrenProps {
  readonly children: ChildrenProp
}

export type ChildrenProp = ReactElement | ReactElement[] 