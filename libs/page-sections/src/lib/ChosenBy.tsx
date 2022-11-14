import { Divider, Stack, SxProps, Theme } from '@mui/material';
import { MaybeShow } from '@whub/wui';
import { ReactNode, useRef } from 'react';

interface ChosenByProps {
  readonly children: ReactNode;
  readonly sx?: SxProps<Theme>;
  readonly blackAndWhite?: boolean;
  readonly hideDivider?: boolean;
}

export function ChosenBy(props: ChosenByProps) {
  const containerRef = useRef<HTMLDivElement>();
  return (
    <>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={5}
        ref={containerRef}
        sx={{
          width: 'auto',

          '@keyframes infinite-slide': {
            from: {
              transform: 'translateX(0%)',
            },
            to: {
              transform: 'translate(-25%)',
            },
          },
          animation: 'infinite-slide 10s linear infinite',
          filter: (theme) =>
            theme.palette.mode === 'dark' ? 'unset' : 'invert(1)',
          ...props.sx,
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-evenly"
          flexWrap="nowrap"
          sx={{
            '& > *': {
              marginInline: 9,
              marginBlock: 1.5,
              filter: props.blackAndWhite ? 'grayscale(100%)' : 'none',
            },
            position: 'relative',
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
