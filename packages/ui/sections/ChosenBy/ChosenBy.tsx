import { alpha, Divider, Stack, SxProps, Theme } from '@mui/material';
import { MaybeShow } from '@webion/ui-components';
import Section from '@webion/ui-layout/Section';
import { ReactNode, useRef } from 'react';
import ISection from '../abstractions';

interface ChosenByProps extends ISection {
  readonly children: ReactNode;
  readonly sx?: SxProps<Theme>;
  readonly blackAndWhite?: boolean;
  readonly hideDivider?: boolean;
}

export function ChosenBy(props: ChosenByProps) {
  const containerRef = useRef<HTMLDivElement>();

  return (
    <Section
      id={props.id}
      ignoreSection
      sx={{
        paddingBlock: 4,
        overflow: 'hidden',
        '::-webkit-scrollbar': {
          display: 'none',
        },
        width: 'auto',
        position: 'relative',
      }}
    >
      <Stack
        direction="column"
        alignItems="flex-start"
        justifyContent="center"
        spacing={5}
        ref={containerRef}
        sx={{
          width: '100%',
          position: 'relative',
          '&::after': {
            content: "''",
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            background: theme => `linear-gradient(90deg,
              ${theme.palette.background.default} 0%,
              ${alpha(theme.palette.background.default, 0)} 10%,
              ${alpha(theme.palette.background.default, 0)} 90%,
              ${theme.palette.background.default} 100%
            )`,
          },
          ...props.sx
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-evenly"
          flexWrap="nowrap"
          sx={{
            '@keyframes infinite-slide': {
              from: {
                transform: 'translateZ(0) translateX(0%)',
              },
              to: {
                transform: 'translateZ(0) translateX(-50%)',
              },
            },
            animation: 'infinite-slide 24s linear infinite',
            filter: (theme) => theme.palette.mode === 'dark' ? 'unset' : 'invert(1)',
            position: 'relative',
            paddingTop: { xs: 1, md: 0 },
          }}
        >
          {[...Array(2)].map((_, i) => (
            <Stack
              key={i}
              direction="row"
              alignItems="center"
              justifyContent="space-evenly"
              sx={{
                '& > *': {
                  marginInline: 9,
                  marginBlock: 1.5,
                  filter: props.blackAndWhite ? 'grayscale(100%)' : 'none',
                  userDrag: 'unset',
                  userSelect: 'none',
                  width: '100% !important',
                  display: 'block'
                },
              }}
            >
              {props.children}
            </Stack>
          ))}
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
    </Section>
  );
}
