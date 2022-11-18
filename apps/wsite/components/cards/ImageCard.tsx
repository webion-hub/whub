import { Box, Button, CardActionArea, CardActions, CardContent, Stack, SxProps, Theme, Typography } from '@mui/material';
import { MaybeShow } from '@whub/wui';
import { ReactNode } from 'react';
import { WebionCard } from './WebionCard';

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
