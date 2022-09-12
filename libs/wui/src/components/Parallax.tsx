import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { debounceTime, fromEvent } from "rxjs";
import { BaseProps } from "../abstractions/props/BaseProps";

export function Parallax(props: BaseProps) {
  const containerRef = useRef<HTMLDivElement>()
  const ref = useRef<HTMLDivElement>()

  useEffect(() => {
    const sub$ = fromEvent(window, 'scroll')
    .pipe(debounceTime(1))
    .subscribe(() => updatePos())

  return () => sub$.unsubscribe()
  },[])

  const updatePos = () => {
    if(!ref.current || !containerRef.current)
      return

    const rect = containerRef.current.getBoundingClientRect()
    
    const y = (rect.top - (window.innerHeight - rect.height) / 2)
    const normY = y / window.innerHeight / 4

    ref.current.style.transform = `translateY(${-normY*100}%)`
  }

  return (
    <Box 
      ref={containerRef}
      sx={{
        ...props.sx,
        position: 'absolute', 
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        top: 0,
        left: 0,
      }}  
    >
      <Box
        ref={ref}
        sx={{
          position: 'absolute', 
          zIndex: -1,
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
        }}
      >
        {props.children}
      </Box>
    </Box>

  )
}