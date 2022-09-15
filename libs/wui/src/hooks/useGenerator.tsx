import { useRef } from "react"

export const useGenerator = <T,G,J,>(generator: Generator<T,G,J>) => {
  return useRef(generator).current
}
