import { Box } from '@mui/system';
import { NextImg } from '@wui/components';

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
        aspectRatio: '3/1',
      }}
    >
      <NextImg
        src={props.src}
        alt={props.src}
        fill
        priority
        sizes='
          (max-width: 900px) 100vw,
          1000px
        '
        sx={{
          objectFit: 'cover',
          position: 'relative !important',
        }}
      />
    </Box>
  );
}
