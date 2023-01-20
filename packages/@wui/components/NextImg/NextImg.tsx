import { Box, styled } from '@mui/material';
import { SxProps, Theme } from '@mui/material';
import Image, { ImageProps } from 'next/image';

const NextImgSx = styled(Image)({});

interface AutoSizeProps {
  readonly width?: string; 
  readonly height?: string; 
}

interface NextImgProps extends ImageProps {
  readonly sx?: SxProps<Theme>;
  readonly auto?: AutoSizeProps;
}

export function NextImg(props: NextImgProps) {
  const { auto, sx, ...others } = props;

  if (auto) {
    const { ...imgProps } = others;

    const widthStyle = auto.width 
      ? `${auto.width}` 
      : 'auto';

    const heightStyle = auto.height 
      ? `${auto.height}` 
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
