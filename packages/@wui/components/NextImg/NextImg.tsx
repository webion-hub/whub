import { Box, styled } from '@mui/material';
import { SxProps, Theme } from '@mui/material';
import Image, { ImageProps } from 'next/image';

const NextImgSx = styled(Image)({});

interface NextImgProps extends ImageProps {
  readonly sx?: SxProps<Theme>;
  readonly auto?: boolean;
}

export function NextImg(props: NextImgProps) {
  const { auto, sx, ...others } = props;

  if (auto) {
    const { height, width, ...imgProps } = others;

    const widthStyle = width 
      ? `${width}px` 
      : 'auto';

    const heightStyle = height 
      ? `${height}px` 
      : 'auto';

    return (
      <NextImgSx
        {...imgProps}
        fill
        sx={{
          ...(sx as any),
          objectFit: 'contain',
          width: `${widthStyle} !important`,
          height: `${heightStyle} !important`,
          position: 'relative !important',
        }}
      ></NextImgSx>
    );
  }

  return <NextImgSx sx={sx} {...others} />;
}
