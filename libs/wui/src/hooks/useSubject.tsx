import { useEffect, useRef, useState } from "react"
import { BehaviorSubject } from "rxjs"

export const useSubjectState = <T,>(initialValue: T) => {
  const subjectRef$ = useRef(new BehaviorSubject<T>(initialValue))
  const [state, setState] = useState<T>(initialValue)

  const setValue = (value: T) => {
    setState(value)
    subjectRef$.current.next(value)
  }

  return {
    state,
    setState: setValue,
    subject: subjectRef$.current
  }
}

export const useSubjectStateListener = <T,>(
  subject: BehaviorSubject<T> | undefined,
  initialValue?: T
) => {
  const [state, setState] = useState<T | undefined>(initialValue)

  useEffect(() => {
    if(!subject)
      return

    const sub = subject.subscribe(setState)

    return () => sub.unsubscribe()
  }, [subject, initialValue])

  return state
}
