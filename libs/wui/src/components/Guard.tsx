import { Navigate } from "react-router-dom"

export interface GuardProps {
  readonly canNavigate: boolean,
  readonly redirectTo: string,
  readonly el: any,
}

export function Guard(props: GuardProps) {
  const { canNavigate, redirectTo, el } = props

  return canNavigate
    ? el
    : <Navigate to={redirectTo} />
}
