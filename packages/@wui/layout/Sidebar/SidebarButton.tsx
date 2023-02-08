import MenuRounded from '@mui/icons-material/MenuRounded';
import { IconButton } from '@mui/material';
import { ChildrenProp } from '@wui/core';
import { useLayout } from '../Layout/Layout';

export interface SideBarButtonProps {
  readonly children?: ChildrenProp;
  readonly color?:
    | 'inherit'
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
}

export function SideBarButton(props: SideBarButtonProps) {
  const { toggleSideBar } = useLayout();

  return (
    <IconButton onClick={toggleSideBar} color={props.color}>
      {props.children}
    </IconButton>
  );
}

SideBarButton.defaultProps = {
  visible: false,
  color: 'primary',
  children: <MenuRounded />,
};
