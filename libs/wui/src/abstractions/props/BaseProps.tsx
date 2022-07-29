import { SxProps, Theme } from '@mui/system';
import { ChildrenProps } from './ChildrenProps';

export interface BaseProps extends ChildrenProps {
  readonly sx?: SxProps<Theme>
}