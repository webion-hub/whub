import { Divider, Stack, SxProps, Theme } from '@mui/material';
import { MaybeShow } from '@whub/wui';
import { ReactNode } from 'react';

interface ChosenByProps {
  readonly children: ReactNode;
  readonly sx?: SxProps<Theme>;
  readonly blackAndWhite?: boolean;
  readonly hideDivider?: boolean;
}

export function ChosenBy(props: ChosenByProps) {
  return (
    <>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={5}
        sx={{
          maxWidth: '100%',
          width: '100%',
          overflow: 'initial',
          ...props.sx,
          '@keyframes infinite-slide': {
            from: {
              transform: 'translateX(100%)',
            },
            to: {
              transform: 'translateX(-100%)',
            },
          },
          animationName: 'infinite-slide',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'linear',
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-evenly"
          flexWrap="wrap"
          sx={{
            '& > *': {
              margin: 2,
              filter: props.blackAndWhite ? 'grayscale(100%)' : 'none',
            },
            position: 'relative',
            width: '100%',
            paddingTop: { xs: 1, md: 0 },
          }}
        >
          {props.children}
        </Stack>
      </Stack>
      <MaybeShow show={!props.hideDivider}>
        <Divider
          sx={{
            position: 'absolute',
            width: '100vw',
            bottom: 0,
          }}
        />
      </MaybeShow>
    </>
  );
}
