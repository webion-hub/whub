import { alpha, Box, Card } from '@mui/material';
import { BaseProps, Coords } from '@whub/wui';
import { useRef, useState } from 'react';

export function WebionCard(props: BaseProps) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState<Coords>({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>();

  return (
    <Card
      ref={cardRef}
      onMouseLeave={() => setShow(false)}
      onMouseEnter={() => setShow(true)}
      onMouseMove={(e) => {
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.x;
        const y = e.clientY - rect.y;

        setPos({ x, y });
      }}
      sx={{
        position: 'relative',
        minWidth: { xs: '100%', md: 350 },
        transition: '0.5s transform, 0.5s box-shadow',
        boxShadow: 'none',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: (theme) => theme.shadows[10],
          borderColor: 'transparent',
        },
        ...props.sx,
      }}
    >
      <Box
        sx={{
          content: "''",
          display: show ? 'block' : 'none',
          position: 'absolute',
          pointerEvents: 'none',
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          width: 0,
          height: 0,
          left: 0,
          top: 0,
          boxShadow: (theme) =>
            `0px 0px 1200px 60px ${
              theme.palette.mode == 'dark'
                ? alpha(theme.palette.secondary.main, 0.2)
                : alpha(theme.palette.primary.main, 0.3)
            }`,
        }}
      />
      {props.children}
    </Card>
  );
}
