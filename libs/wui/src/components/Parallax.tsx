import { Box } from '@mui/material';
import { useEffect, useRef } from 'react';
import { debounceTime, fromEvent } from 'rxjs';
import { BaseProps } from '../abstractions/props/BaseProps';

export interface ParallaxProps extends BaseProps {
  readonly speedX?: number;
  readonly speedY?: number;
  readonly fromTop?: boolean;
}

export function Parallax(props: ParallaxProps) {
  const containerRef = useRef<HTMLDivElement>();
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    updatePos();

    const sub$ = fromEvent(window, 'scroll').subscribe(() => updatePos());

    return () => sub$.unsubscribe();
  }, [props]);

  const updatePos = () => {
    if (!ref.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const normY = rect.top - (window.innerHeight - rect.height) / 2;

    const yPos = props.fromTop ? window.scrollY : normY;

    ref.current.style.transform = `translate(
      ${-yPos * (props.speedX ?? 0)}px,
      ${-yPos * (props.speedY ?? 0)}px
    )`;
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        top: 0,
        left: 0,
        ...props.sx,
      }}
    >
      <Box
        ref={ref}
        sx={{
          willChange: 'transform',
          position: 'absolute',
          zIndex: -1,
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
}

Parallax.defaultProps = {
  speedX: 0,
  speedY: 0,
};
