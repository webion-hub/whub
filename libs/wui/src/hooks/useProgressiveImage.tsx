import { useEffect, useState } from "react"

export const useProgressiveImage = (src: string) => {
  const [sourceLoaded, setSourceLoaded] = useState<string | null>(null)

  useEffect(() => {
    setSourceLoaded(null)
    const img = new Image()

    if(!src) {
      setSourceLoaded('')
      return
    }

    img.src = src
    img.onload = () => setSourceLoaded(src)
  }, [src])

  return {
    srcLoaded: sourceLoaded,
    loading: sourceLoaded === null
  }
}
