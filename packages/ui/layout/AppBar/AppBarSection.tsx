import { Stack, SxProps, Theme } from '@mui/material';
import { Breakpoint } from '@mui/system';

type Visibility = {
  [fixedBreakpoint in Breakpoint]?: boolean;
}
export interface AppBarSectionProps {
  readonly children: any;
  readonly isVisible?: Visibility;
  readonly spacing?: number;
  readonly fullWidth?: boolean;
  readonly sx?: SxProps<Theme>;
  readonly alignment: 'start' | 'end' | 'center' | '';
}

export function AppBarSection(props: AppBarSectionProps) {
  const visibility = Object
    .entries(props.isVisible ?? {})
    .map(v => [v[0], v[1] ? 'flex' : 'none']) 

  const displayStyle = Object.fromEntries(visibility) as any;

  return (
    <Stack
      direction="row"
      spacing={props.spacing}
      sx={{
        width: props.fullWidth ? '100%' : 'auto',
        display: displayStyle, 
        ...props.sx,
      }}
    >
      {props.children}
    </Stack>
  );
};

AppBarSection.displayName = 'AppBarSection'

AppBarSection.defaultProps = {
  alignment: '',
};
