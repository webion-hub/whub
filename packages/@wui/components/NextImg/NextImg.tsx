import { Skeleton, SkeletonProps, styled, SxProps, Theme } from '@mui/material';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

const NextImgSx = styled(Image)({});

interface AutoSizeProps {
  readonly width?: string; 
  readonly height?: string; 
}

interface NextImgProps extends ImageProps {
  readonly sx?: SxProps<Theme>;
  readonly skeletonvariant?: SkeletonProps['variant'],
  readonly skeletonSx?: SkeletonProps['sx'],
  readonly auto?: AutoSizeProps;
}

export function NextImg(props: NextImgProps) {
  const [loading, setLoading] = useState(true)
  const { auto, sx, ...others } = props;

  const autoWidth = auto?.width ?? 'auto' 
  const autoHeight = auto?.height ?? 'auto' 

  const widthStyle = auto 
    ? autoWidth 
    : others.width
  
  const heightStyle = auto 
    ? autoHeight 
    : others.height
  
  const skeleton = (
    <Skeleton
      variant={props.skeletonvariant ?? 'rectangular'}
      width={widthStyle ?? '100%'}
      height={heightStyle ?? '100%'}
      animation="wave"
      sx={{
        ...sx,
        ...(props.skeletonSx as any),
        display: loading ? 'block' : 'none'
      }}
    />
  )

  if (auto) {
    const { ...imgProps } = others;

    return (
      <>
        {skeleton}
        <NextImgSx
          {...imgProps}
          onLoad={() => setLoading(false)}
          fill
          sx={{
            visibility: loading ? 'hidden' : 'visible',
            position: loading ? 'absolute' : 'relative !important',
            objectFit: 'contain',
            width: `${widthStyle} !important`,
            height: `${heightStyle} !important`,
            ...(sx as any),
          }}
        />
      </>
    );
  }

  return (
    <>
      {skeleton}
      <NextImgSx
        onLoad={() => setLoading(false)}
        sx={{
          position: loading ? 'absolute' : 'unset',
          visibility: loading ? 'hidden' : 'visible',
          ...sx,
        }} 
        {...others} 
      />
    </>
  );
}
