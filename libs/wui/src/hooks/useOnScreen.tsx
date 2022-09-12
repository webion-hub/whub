import React, { useEffect } from "react"

export function useOnScreen(ref: React.RefObject<any>, oneTime: boolean) {
  const [isIntersecting, setIntersecting] = React.useState(false)
  const isIntersectingRef = React.useRef(isIntersecting)

  const observer = new IntersectionObserver(([entry]) => {
    if(oneTime && isIntersectingRef.current)
      return;

    isIntersectingRef.current = entry.isIntersecting
    setIntersecting(entry.isIntersecting)
  })

  useEffect(() => {
    observer.observe(ref.current)
    return () => { observer.disconnect() }
  }, [])

  return isIntersecting
}