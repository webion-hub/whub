import { Box } from '@mui/system';
import { NextImg } from '@whub/wui';

interface CoverProps {
  readonly src: string;
}

export default function Cover(props: CoverProps) {
  return (
    <Box
      sx={{
        marginTop: 5,
        width: '100%',
        borderRadius: (theme) => theme.shape.borderRadius,
        overflow: 'hidden',
        height: '400px',
      }}
    >
      <NextImg
        src={props.src}
        alt={props.src}
        fill
        sx={{
          objectFit: 'cover',
          position: 'relative !important',
        }}
      />
    </Box>
  );
}
