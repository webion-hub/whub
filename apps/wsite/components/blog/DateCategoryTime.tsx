import { Chip, Stack, Typography } from '@mui/material';
import useLanguage from '@webion/ui-wrappers/useLanguage';

interface DateAndCategoryProps {
  readonly date?: string;
  readonly category?: string;
  readonly readingTime?: number;
}

export default function DateCategoryTime(props: DateAndCategoryProps) {
  const { t } = useLanguage();

  const date = props.date
  ? new Date(props.date)
  : new Date()

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      gap={4}
      sx={{
        marginTop: 4,
      }}
    >
      <Typography variant="body1" color="text.secondary">
        {date.toLocaleDateString()}
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ fontWeight: 'light', fontStyle: 'italic' }}
      >
        {props.readingTime ?? '??'} min
      </Typography>
      <Chip
        sx={{
          textTransform: 'capitalize',
        }}
        label={t(props.category ?? '')}
      />
    </Stack>
  );
}
