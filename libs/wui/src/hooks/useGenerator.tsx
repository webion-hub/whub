import { useRef } from "react"

export const useGenerator = <T,G,J,>(genarateGenerator: () => Generator<T,G,J>) => {
  const generator = useRef(genarateGenerator())

  const reset = () => {
    generator.current = genarateGenerator()
  }

  return {
    generator: generator.current,
    reset
  }
}
