import { SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import Button, { ButtonProps } from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import { ReactNode } from 'react';
import MaybeShow from '../MaybeShow';
import WebionCard from '../WebionCard';

export interface ClickableCardProps {
  readonly sx?: SxProps<Theme>;
  readonly children?: ReactNode;
  readonly buttonLabel?: string;
  readonly buttonProps?: ButtonProps;
  readonly secondaryButtonProps?: ButtonProps;
  readonly secondaryButtonLabel?: string;
  readonly onClick?: (e: any) => void;
  readonly onClickSecondary?: (e: any) => void;
}

export function ClickableCard(props: ClickableCardProps) {
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
            {props.children}
          </CardContent>
          <MaybeShow show={!!props.onClick}>
            <CardActions sx={{ height: 52.5 }} />
          </MaybeShow>
        </>
      )}
      <MaybeShow show={!!props.buttonLabel || !!props.secondaryButtonLabel}>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: 'absolute',
            bottom: 8,
            left: 8,
          }}
        >
          <MaybeShow show={!!props.buttonLabel}>
            <Button
              onClick={props.onClick}
              component="span"
              variant="contained"
              {...props.buttonProps}
            >
              {props.buttonLabel}
            </Button>
          </MaybeShow>

          <MaybeShow show={!!props.secondaryButtonLabel}>
            <Button
              onClick={props.onClickSecondary}
              component="span"
              variant="text"
              color="inherit"
              {...props.secondaryButtonProps}
            >
              {props.secondaryButtonLabel}
            </Button>
          </MaybeShow>
        </Stack>
      </MaybeShow>
    </WebionCard>
  );
}
