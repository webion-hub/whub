import { Typography } from '@mui/material';
import { ChildrenProps } from '@wui/core';

export default function ArticleTitle({ title }: { title: string }) {
  return (
    <Typography
      variant="h3"
      component="h1"
      sx={{
        textAlign: 'center',
        marginTop: 8,
      }}
    >
      {title}
    </Typography>
  );
}
