import { Typography } from '@mui/material';
import { Box, SxProps, Theme } from '@mui/system';
import React, { useMemo } from 'react';

interface RandomText {
  readonly text: string;
  readonly probability: number;
}

export interface RandomTextBackgroundProps {
  readonly sx?: SxProps<Theme>;
  readonly textsNum: number;
  readonly texts: RandomText[];
}

const RandomTextComp = React.forwardRef<
  HTMLDivElement,
  RandomTextBackgroundProps
>((props, ref) => {
  const texts = useMemo(() => {
    return props.texts
      .map((t) =>
        Array.from(Array(Math.floor(t.probability * 100))).fill(t.text)
      )
      .flat();
  }, [props.texts]);

  const getRandomText = () => {
    const index = Math.floor(Math.random() * 100);
    return texts[index];
  };

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
      {[...Array(props.textsNum)].map((_, i) => (
        <Typography
          key={i}
          color="primary"
          sx={{
            position: 'absolute',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transition: '0.25s transform',
            willChange: 'opacity',
            animation: `flicker ${
              Math.random() + 2
            }s ease-in-out alternate infinite`,
            animationDelay: `-${Math.random() * 4}s`,
            userSelect: 'none',
            '@keyframes flicker': {
              '0%': {
                opacity: 0.4,
              },
              '100%': {
                opacity: 0,
              },
            },
          }}
        >
          {getRandomText()}
        </Typography>
      ))}
    </Box>
  );
});

const RandomText = React.memo(RandomTextComp, () => false);

export default RandomText;
