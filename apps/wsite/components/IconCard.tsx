import {
  alpha,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Stack,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import { BaseProps, Coords, MaybeShow } from '@whub/wui';
import { ReactNode, useRef, useState } from 'react';

export interface ImageCardProps {
  readonly img?: ReactNode;
  readonly sx?: SxProps<Theme>;
  readonly title: string;
  readonly paragraph?: string | JSX.Element | JSX.Element[];
  readonly children?: ReactNode;
  readonly buttonLabel?: string;
  readonly secondaryButtonLabel?: string;
  readonly onClick?: (e: any) => void;
  readonly onClickSecondary?: (e: any) => void;
}

export interface IconCardProps {
  readonly icon: ReactNode;
  readonly title: string;
  readonly paragraph?: string | JSX.Element | JSX.Element[];
  readonly children?: ReactNode;
  readonly sx?: SxProps<Theme>;
  readonly buttonLabel?: string;
  readonly secondaryButtonLabel?: string;
  readonly iconBackgroundColor?: string;
  readonly onClick?: (e: any) => void;
  readonly onClickSecondary?: (e: any) => void;
}

export function IconCard(props: IconCardProps) {
  return (
    <ImageCard
      img={
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 64,
            height: 64,
            margin: 1,
            marginBottom: 4,
            borderRadius: '100%',
            position: 'relative',
            background: (theme) =>
              props.iconBackgroundColor
                ? props.iconBackgroundColor
                : alpha(theme.palette.primary.main, 0.4),
          }}
        >
          {props.icon}
        </Stack>
      }
      {...props}
    />
  );
}

export function WebionCard(props: BaseProps) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState<Coords>({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>();

   const moveLight = (coords: Coords) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = coords.x - rect.x;
    const y = coords.y - rect.y;

    setPos({ x, y });
   } 

  const mouseMoveLight = (e: any) => {
    moveLight({
      x: e.clientX,
      y: e.clientY,
    })
  }

  const touchMoveLight = (e: any) => {
    const touch = e.touches[0] || e.changedTouches[0]

    moveLight({
      x: touch.clientX,
      y: touch.clientY,
    })
  }

  return (
    <Card
      ref={cardRef}
      onTouchStart={() => setShow(true)}
      onTouchEnd={() => setShow(false)}
      onTouchMove={touchMoveLight}
      onMouseLeave={() => setShow(false)}
      onMouseEnter={() => setShow(true)}
      onMouseMove={mouseMoveLight}
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
          position: 'absolute',
          pointerEvents: 'none',
          width: 600,
          aspectRatio: '1',
          left: 0,
          top: 0,
          background: (theme) =>
            `radial-gradient(circle, ${alpha(
              theme.palette.secondary.main,
              0.2
            )} 0%, ${alpha(theme.palette.secondary.main, 0)} 50%)`,
        }}
        style={{
          transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px)`,
          display: show ? 'block' : 'none',
        }}
      />
      {props.children}
    </Card>
  );
}

export function ImageCard(props: ImageCardProps) {
  const getActionComp = (children: ReactNode) => {
    const sx: SxProps<Theme> = {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    };

    return props.onClick ? (
      <CardActionArea onClick={props.onClick} sx={sx}>
        {children}
      </CardActionArea>
    ) : (
      <Box sx={sx}>{children}</Box>
    );
  };

  return (
    <WebionCard sx={props.sx}>
      {getActionComp(
        <>
          <CardContent sx={{ width: '100%' }}>
            {props.img}
            <Typography variant="h5" sx={{ marginBlock: 1 }}>
              {props.title}
            </Typography>
            <MaybeShow show={!!props.paragraph}>
              <Typography
                variant="body1"
                color="text.secondary"
                component="span"
              >
                {props.paragraph}
              </Typography>
            </MaybeShow>
            {props.children}
          </CardContent>
          <MaybeShow show={!!props.onClick}>
            <CardActions sx={{ height: 52.5 }} />
          </MaybeShow>
        </>
      )}
      <MaybeShow show={!!props.onClick || !!props.onClickSecondary}>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: 'absolute',
            bottom: 8,
            left: 8,
          }}
        >
          <MaybeShow show={!!props.onClick}>
            <Button
              onClick={props.onClick}
              component="span"
              variant="contained"
            >
              {props.buttonLabel}
            </Button>
          </MaybeShow>

          <MaybeShow show={!!props.onClickSecondary}>
            <Button
              onClick={props.onClickSecondary}
              component="span"
              variant="text"
              color="inherit"
            >
              {props.secondaryButtonLabel}
            </Button>
          </MaybeShow>
        </Stack>
      </MaybeShow>
    </WebionCard>
  );
}
