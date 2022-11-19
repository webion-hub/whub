import { alpha, Box, Stack, Typography } from '@mui/material';

import { useLanguage, useOnScreen } from '@whub/wui';
import { useRef } from 'react';

interface ProcessProps {
  readonly step: string;
  readonly title: string;
  readonly description: string;
  readonly in: boolean;
  readonly delay: number;
}

function Process(props: ProcessProps) {
  const stepTime = 500;
  const textTime = 750;

  return (
    <Stack direction="column" alignItems="center" sx={{ maxWidth: 250 }}>
      <Typography
        variant="h1"
        component="span"
        sx={{
          zIndex: -1,
          color: (theme) => alpha(theme.palette.text.secondary, 0.3),
          transitionProperty: 'transform',
          transitionDelay: `${props.delay}ms`,
          transitionDuration: `${stepTime}ms`,
          transform: props.in ? 'translateY(0px)' : 'translateY(52px)',
        }}
      >
        {props.step}
      </Typography>
      <Box
        sx={{
          width: 20,
          height: 20,
          borderRadius: '100%',
          background: (theme) => theme.palette.primary.main,
          boxShadow: (theme) =>
            `0px 0px 0 6px ${theme.palette.background.default}`,
        }}
      />
      <Stack
        direction="column"
        alignItems="center"
        spacing={1}
        sx={{
          marginTop: 4,
          transitionProperty: 'opacity, transform',
          transitionDelay: `${props.delay}ms`,
          transitionDuration: `${textTime}ms`,
          opacity: props.in ? 1 : 0,
          transform: props.in ? 'translateY(0px)' : 'translateY(-32px)',
        }}
      >
        <Typography variant="h5">{props.title}</Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center">
          {props.description}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default function OurProcess() {
  const ref = useRef();
  const { t } = useLanguage();
  const onScreen = useOnScreen(ref, {
    oneTime: true,
    observeOptions: {
      rootMargin: '-10% 0% -10% 0%',
    },
  });

  return (
    <Box
      ref={ref}
      sx={{
        marginInline: 'auto',
        width: '100%',
        maxWidth: '100%',
        marginBlock: 4,
        zIndex: '2 !important',
      }}
    >
      <Typography
        color="text.primary"
        variant="h2"
        sx={{ textAlign: 'center' }}
      >
        {t('process')}
      </Typography>
      <Stack
        direction="row"
        justifyContent="center"
        flexWrap="wrap"
        sx={{ '& > *': { margin: 4 } }}
      >
        <Process
          in={onScreen}
          delay={0}
          step="01"
          title={t('process1-title')}
          description={t('process1-desc')}
        />
        <Process
          in={onScreen}
          delay={300}
          step="02"
          title={t('process2-title')}
          description={t('process2-desc')}
        />
        <Process
          in={onScreen}
          delay={600}
          step="03"
          title={t('process3-title')}
          description={t('process3-desc')}
        />
        <Process
          in={onScreen}
          delay={900}
          step="04"
          title={t('process4-title')}
          description={t('process4-desc')}
        />
      </Stack>
    </Box>
  );
}
