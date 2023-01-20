import MenuRounded from '@mui/icons-material/MenuRounded';
import { IconButton, useMediaQuery, useTheme } from '@mui/material';
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
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('md'));
  const { toggleSideBar } = useLayout();

  if (isMobileView)
    return (
      <IconButton onClick={toggleSideBar} color={props.color}>
        {props.children}
      </IconButton>
    );

  return null;
}

SideBarButton.defaultProps = {
  visible: false,
  color: 'primary',
  children: <MenuRounded />,
};
