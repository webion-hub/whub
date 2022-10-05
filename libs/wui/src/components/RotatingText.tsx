import { Box, SxProps, Theme } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { interval } from "rxjs"
import { ResponsiveStyleValue } from "@mui/system/styleFunctionSx";

export interface RotatingTextProps {
  readonly labels: string[],
  readonly width: ResponsiveStyleValue<string | number>,
  readonly sx?: SxProps<Theme>,
}

export function RotatingText(props: RotatingTextProps) {
  const [index, setIndex] = useState(0)
  const ref = useRef(0)
  const duration = 2000

  useEffect(() => {
    const intervalSub = interval(duration)
      .subscribe(() => {
        const newIndex = ref.current + 1
        ref.current = newIndex > props.labels.length - 1
          ? 0
          : newIndex
        setIndex(ref.current)
      })

    return () => intervalSub.unsubscribe()
  }, [])

  return (
    <Box
      sx={{
        width: props.width,
        display: 'inline-block',
      }}
    >
      <Box
        sx={{
          ...props.sx,
          animation: `slide ${duration}ms ease-in-out infinite`,
          "@keyframes slide": {
            "0%": {
              opacity: 0,
              transform: "translateY(-100%)"
            },
            "5%": {
              opacity: 0,
              transform: "translateY(-100%)"
            },
            "15%": {
              opacity: 1,
              transform: "translateY(0%)"
            },
            "85%": {
              opacity: 1,
              transform: "translateY(0%)"
            },
            "95%": {
              opacity: 0,
              transform: "translateY(100%)"
            },
            "100%": {
              opacity: 0,
              transform: "translateY(100%)"
            }
          }
        }}
      >
        {` ${props.labels[index]} `}
      </Box>
    </Box>
  )
}
