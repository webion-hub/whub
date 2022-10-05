import { useEffect, useState } from "react";
import { useScroll } from "./useScroll";

interface ScrollState<T> {
  readonly start: T,
  readonly end: T
}

export const useScrollAnimation = <T,>(states: ScrollState<T>, scrollPos: number) => {
  const { isArrived } = useScroll(scrollPos);

  const [state, setState] = useState<T>(states.start)

  useEffect(() => {
    setState(
      isArrived
        ? states.end
        : states.start
    )
  }, [isArrived])

  return state
}
