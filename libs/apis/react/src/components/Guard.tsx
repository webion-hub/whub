import { FullScreenLoading } from "@whub/wui"
import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { CanNavigateStatus, GuardAction } from "../abstractions/Guard"


export interface GuardProps {
  readonly canNavigate: (go: GuardAction) => void,
  readonly redirectTo: string,
  readonly el: any,
}

export function Guard(props: GuardProps) {
  const [go, setGo] = useState<CanNavigateStatus>('loading')
  const { canNavigate, redirectTo, el } = props

  useEffect(() => {
    canNavigate(setGo)
  }, [])

  if(go === 'loading')
    return <FullScreenLoading loading/>

  return go === 'go'
    ? el
    : <Navigate to={redirectTo} />
}


