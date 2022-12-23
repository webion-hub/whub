import { Stack, Typography } from '@mui/material';

interface DateAndCategoryProps {
  readonly date: string;
  readonly category: string;
}
export default function DateAndCategory(props: DateAndCategoryProps) {
  return (
    <Stack
      direction="row"
      gap={4}
      sx={{
        marginTop: 4,
      }}
    >
      <Typography variant="body1" color="secondary">
        {props.date}
      </Typography>
      <Typography variant="body1" color="secondary" sx={{ fontWeight: 'bold' }}>
        {props.category}
      </Typography>
    </Stack>
  );
}
