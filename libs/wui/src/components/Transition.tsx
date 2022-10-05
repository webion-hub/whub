import { ReactNode } from 'react';
import { Box, SxProps, Theme } from '@mui/material';

export interface TransitionProps {
  readonly in: boolean;
  readonly type: 'grow' | 'slide' | 'fade';
  readonly duration: number;
  readonly delay?: number;
  readonly children: ReactNode;
}

export function Transition(props: TransitionProps) {
  const getTransition = (): SxProps<Theme> => {
    return {
      grow: {
        opacity: props.in ? 1 : 0,
        transform: props.in ? 'scale(1)' : 'scale(0.7)',
      },
      slide: {
        opacity: props.in ? 1 : 0,
        transform: props.in ? 'translateY(0)' : 'scale(10%)',
      },
      fade: {
        opacity: props.in ? 1 : 0,
      },
    }[props.type];
  };

  return (
    <Box
      sx={{
        ...getTransition(),
        transitionProperty: 'transform opacity',
        transitionDelay: `${props.delay ?? 0}ms`,
        transitionDuration: `${props.duration}ms`,
        transitionTimingFunction: 'ease-in-out',
        '& > *': {
          height: '100%',
        },
      }}
    >
      {props.children}
    </Box>
  );
}
