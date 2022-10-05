import { ReactNode, useEffect } from "react";
import { useForceRender } from "../../hooks/useForceRender";
import { useForm } from "../../hooks/useForm"
import { useSubjectStateListener } from "../../hooks/useSubject"

export interface GetFormValueProps<T> {
  readonly name: string,
  readonly children: (v: T) => any
}

export function GetFormValue<T>(props: GetFormValueProps<T>) {
  const force = useForceRender();
  const form = useForm()

  useEffect(() => {
    const sub = form.newInputSubject
      .subscribe(force)

    return sub.unsubscribe()
  }, [props.name, form])

  const value = useSubjectStateListener(
    form.getSubject(props.name)
  )

  return props.children(value)
}
