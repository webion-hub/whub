import { Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ReactNode } from 'react';

interface TitleSectionLabelProps {
  readonly label: string | ReactNode;
  readonly title: string | ReactNode;
}

export function TitleSectionLabel(props: TitleSectionLabelProps) {
  const theme = useTheme();
  const reduceTitle = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Stack direction="column" spacing={1}>
      <Typography textTransform="uppercase" variant="caption" color="secondary">
        {props.label}
      </Typography>
      <Typography color="text.primary" variant={reduceTitle ? 'h4' : 'h3'}>
        {props.title}
      </Typography>
    </Stack>
  );
}
