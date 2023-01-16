import { Stack, SxProps, Theme, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

export interface AppBarSectionProps {
  readonly children: any;
  readonly hideOnMobile?: boolean;
  readonly spacing?: number;
  readonly fullWidth?: boolean;
  readonly sx?: SxProps<Theme>;
  readonly alignment: 'start' | 'end' | 'center' | '';
}

export const AppBarSection = React.forwardRef<
  HTMLDivElement,
  AppBarSectionProps
>((props, ref) => {
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobileView && props.hideOnMobile) return null;

  return (
    <Stack
      direction="row"
      spacing={props.spacing}
      sx={{
        width: props.fullWidth ? '100%' : 'auto',
        ...props.sx,
      }}
    >
      {props.children}
    </Stack>
  );
});

AppBarSection.displayName = 'AppBarSection'

AppBarSection.defaultProps = {
  alignment: '',
  hideOnMobile: false,
};
