import {
  Stack,
  SxProps,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ReactNode } from 'react';

interface TitleSectionLabelProps {
  readonly label: string | ReactNode;
  readonly title: string | ReactNode;
  readonly sx?: SxProps<Theme>;
}

export function TitleSectionLabel(props: TitleSectionLabelProps) {
  const theme = useTheme();
  const reduceTitle = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Stack direction="column" spacing={1} sx={props.sx}>
      <Typography textTransform="uppercase" variant="caption" color="secondary">
        {props.label}
      </Typography>
      <Typography
        color="text.primary"
        variant={reduceTitle ? 'h4' : 'h3'}
        component="h1"
      >
        {props.title}
      </Typography>
    </Stack>
  );
}
