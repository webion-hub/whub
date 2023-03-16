import { SxProps, Theme } from '@mui/material';
import { ChildrenProps } from './ChildrenProps';

export interface BaseProps extends ChildrenProps {
  readonly sx?: SxProps<Theme>;
}
