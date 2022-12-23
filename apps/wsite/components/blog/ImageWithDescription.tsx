import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { NextImg } from '@whub/wui';

interface ImageWithDescriptionProps {
  readonly src: string;
  readonly description?: string;
}
export default function ImageWithDescription(props: ImageWithDescriptionProps) {
  return (
    <Stack direction="column" alignItems="center" gap={1}>
      <NextImg
        src={props.src}
        alt={props.description}
        fill
        sx={{
          objectFit: 'cover',
          position: 'relative !important',
          borderRadius: (theme) => theme.shape.borderRadius,
        }}
      />
      <Typography color="text.secondary" variant="body2">
        {props.description}
      </Typography>
    </Stack>
  );
}
