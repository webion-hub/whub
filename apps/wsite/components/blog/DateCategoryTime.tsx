import { Chip, Stack, Typography } from '@mui/material';
import { useLanguage } from '@whub/wui';

interface DateAndCategoryProps {
  readonly date: string;
  readonly category: string;
  readonly readingTime: number;
}
export default function DateCategoryTime(props: DateAndCategoryProps) {
  const { t } = useLanguage();
  return (
    <Stack
      direction="row"
      alignContent="center"
      alignItems="center"
      gap={4}
      sx={{
        marginTop: 4,
      }}
    >
      <Typography variant="body1" color="text.secondary">
        {props.date}
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ fontWeight: 'light', fontStyle: 'italic' }}
      >
        {props.readingTime} min
      </Typography>
      <Chip
        sx={{
          textTransform: 'capitalize',
        }}
        label={t(props.category)}
      />
    </Stack>
  );
}
