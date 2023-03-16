import { Button, SxProps, Theme, Typography } from '@mui/material';
import MaybeShow from '@wui/components/MaybeShow';
import { ReactNode } from 'react';

export interface AppBarLogoProps {
  readonly sx?: SxProps<Theme>;
  readonly buttonSx?: SxProps<Theme>;
  readonly children?: ReactNode;
  readonly label?: string;
  readonly href?: string;
  readonly onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function AppBarLogo(props: AppBarLogoProps) {
  return (
    <Button
      onClick={props.onClick}
      href={props.href}
      sx={{
        padding: 0.5,
        borderRadius: 1,
        width: 'fit-content',
        ...props.buttonSx,
      }}
    >
      {props.children}
      <MaybeShow show={!!props.label}>
        <Typography color="textPrimary" sx={{ paddingLeft: 1 }} variant="h5">
          {props.label}
        </Typography>
      </MaybeShow>
    </Button>
  );
}
