import Box from '@mui/material/Box';
import Stack from '@mui/materiaL/Stack';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material';

interface StepProps {
  readonly step: string;
  readonly title: string;
  readonly description: string;
  readonly in: boolean;
  readonly delay: number;
}

export function Step(props: StepProps) {
  const stepTime = 500;
  const textTime = 750;

  return (
    <Stack direction="column" alignItems="center" sx={{ maxWidth: 250 }}>
      <Typography
        variant="h1"
        component="span"
        sx={{
          zIndex: -1,
          color: (theme) => alpha(theme.palette.text.secondary, 0.5),
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
        <Typography variant="h5" component="h3">
          {props.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center">
          {props.description}
        </Typography>
      </Stack>
    </Stack>
  );
}