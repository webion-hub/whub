import { Typography } from "@mui/material";
import { Box, SxProps, Theme } from "@mui/system";
import React, { useMemo } from "react";

interface Digit {
  readonly digit: string,
  readonly probability: number,
}

export interface RandomDigitsProps {
  readonly sx?: SxProps<Theme>,
  readonly digitsNum: number,
  readonly digits: Digit[],
}

const RandomDigitsComp = React.forwardRef<HTMLDivElement, RandomDigitsProps>((props, ref) => {
  const digits = useMemo(() => {
    return props.digits
      .map(d => Array
        .from(Array(Math.floor(d.probability * 100)))
        .fill(d.digit)
      )
      .flat()
  }, [props.digits])

  const getRandomDigit = () => {
    const index = Math.floor(Math.random() * 100)
    return digits[index]
  } 

  return (
    <Box
      ref={ref}
      sx={{
        ...props.sx,
        position: 'absolute', 
        zIndex: -1,
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
      }}
    >
      {
        [...Array(props.digitsNum)].map((_, i) => (
          <Typography
            key={i}
            color="primary"
            sx={{
              position: 'absolute',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transition: '0.25s transform',
              willChange: "opacity",
              animation: `flicker ${Math.random() + 2}s ease-in-out alternate infinite`,
              animationDelay: `-${Math.random() * 4}s`,
              userSelect: 'none',
              "@keyframes flicker": {
                "0%": {
                  opacity: 0.4,
                },
                "100%": {
                  opacity: 0,
                },
              },
            }}
          >
            {getRandomDigit()}
          </Typography>
        ))
      }
    </Box>
  );
});

const RandomDigits = React.memo(RandomDigitsComp, () => false)

export default RandomDigits;
