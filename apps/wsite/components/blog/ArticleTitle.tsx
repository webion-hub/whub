import { Typography } from '@mui/material';
import { ChildrenProps } from '@webion/ui-core';

export default function ArticleTitle({ title }: { title: string }) {
  return (
    <Typography
      variant="h3"
      component="h1"
      sx={{ textAlign: 'center', marginTop: 4 }}
    >
      {title}
    </Typography>
  );
}
