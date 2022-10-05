import { ReactNode } from "react";

export interface ApiContextProps<T,G> extends ApiContext<T,G> {
  readonly children: ReactNode
}

export interface ApiContext<T,G> {
  readonly api: T,
  readonly config?: G,
}
