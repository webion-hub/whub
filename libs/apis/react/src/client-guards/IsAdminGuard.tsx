import { ChildrenProp, MaybeShow, useNextNavigator } from "@whub/wui"
import { useEffect, useState } from "react"
import { Guards } from "../server-guards/Guards"


interface GuardProps {
  readonly children: ChildrenProp,
  readonly redirectTo: string
}

export default function IsAdminGuard(props: GuardProps) {
  const { navigate } = useNextNavigator()
  const [show, setShow] = useState(false)

  useEffect(() => {
    Guards
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
