import { SxProps, Theme, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import MaybeShow from '@wui/components/MaybeShow';
import NextImg from '@wui/components/NextImg';
import Transition from '@wui/components/Transition';
import { useOnScreen } from '@wui/core';
import { ReactNode, useRef } from 'react';
import { TitleSectionLabel } from './TitleSectionLabel';

export interface ImageAndDescriptionProps {
  readonly actionComponent?: ReactNode;
  readonly title: string | ReactNode;
  readonly label: string | ReactNode;
  readonly description: string | ReactNode;
  readonly src?: string;
  readonly alt: string;
  readonly removePaper?: boolean;
  readonly imageComponent?: ReactNode;
  readonly paperSx?: SxProps<Theme>;
  readonly direction: 'row' | 'row-reverse';
}

export function ImageAndDescription(props: ImageAndDescriptionProps) {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  const ref = useRef();
  const onScreen = useOnScreen(ref, {
    oneTime: true,
    observeOptions: {
      rootMargin: '-10% 0% -10% 0%',
    },
  });

  return (
    <Stack
      ref={ref}
      direction={props.direction}
      flexWrap="wrap"
      justifyContent="space-evenly"
      spacing={isMd ? 0 : 8}
      sx={{
        margin: 4,
        '& > *': {
          marginBlock: {
            xs: 4,
            md: 0,
          },
          width: isMd ? '100%' : `calc(50% - ${theme.spacing(4)})`,
        },
      }}
    >
      <Transition in={onScreen} type="grow" duration={400}>
        <Paper
          sx={{
            overflow: 'hidden',
            maxHeight: 600,
            minHeight: 250,
            position: 'relative',
            ...props.paperSx,
          }}
        >
          <MaybeShow
            show={!!props.src}
            alternativeChildren={props.imageComponent}
          >
            <NextImg
              src={props.src ?? ''}
              alt={props.alt}
              fill
              sizes="
                (max-width: 700px) 100vw,
                (max-width: 1327px) 50vw,
                600px
              "
              sx={{
                objectFit: 'cover',
                position: 'relative !important',
              }}
            />
          </MaybeShow>
        </Paper>
      </Transition>

      <Transition in={onScreen} type="grow" duration={400} delay={200}>
        <Stack direction="column" spacing={3}>
          <TitleSectionLabel label={props.label} title={props.title} />
          <Typography color="text.secondary" variant="body1">
            {props.description}
          </Typography>
          <Box>{props.actionComponent}</Box>
        </Stack>
      </Transition>
    </Stack>
  );
}
