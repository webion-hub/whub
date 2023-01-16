import MaybeShow from "@wui/components/MaybeShow"
import { ChildrenProp, useNextNavigator } from "@wui/core"
import { useEffect, useState } from "react"
import { ServerGuards } from "../server-guards"


interface GuardProps {
  readonly children: ChildrenProp,
  readonly redirectTo: string
}

export default function IsAdmin(props: GuardProps) {
  const { navigate } = useNextNavigator()
  const [show, setShow] = useState(false)

  useEffect(() => {
    ServerGuards
      .isAdmin(props.redirectTo)
      .then(res => {
        if(res.props?.success) {
          setShow(true)
          return
        }

        navigate(res.redirect?.destination ?? '')
      })
  })

  return (
    <MaybeShow show={show}>
      {props.children}
    </MaybeShow>
    )
}
