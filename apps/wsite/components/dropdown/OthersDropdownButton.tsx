import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { SvgIconComponent } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { useLanguage } from '@whub/wui';

export interface OthersDropdownButtonProps {
  readonly icon: SvgIconComponent;
  readonly text: string;
  readonly page: string;
}

const OthersDropdownButton = React.forwardRef<
  HTMLDivElement,
  OthersDropdownButtonProps
>((props, ref) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { t } = useLanguage();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const texts = ['Webion', 'WUI', 'WUI+', 'Blog', t('dropdown-button')];

  return (
    <>
      <Button
        color="inherit"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {props.text}
        <props.icon />
      </Button>
      <Menu ref={ref} anchorEl={anchorEl} open={open} onClose={handleClose}>
        {texts.map((text) => {
          if (text === props.page) return null;

          return (
            <MenuItem onClick={handleClose} key={text}>
              <Typography variant="caption">{text}</Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
});

OthersDropdownButton.displayName = "OthersDropdownButton"
export default OthersDropdownButton;
