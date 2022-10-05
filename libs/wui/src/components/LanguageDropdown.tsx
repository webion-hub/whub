import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { IconButton, Typography } from '@mui/material';
import { Language } from '../lib/Language';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { useLanguage } from '../contexts/ContextLanguage';

export interface LanguageDropdownButtonProps {
  readonly icon: OverridableComponent<any>;
}

export const LanguageDropdownButton = React.forwardRef<
  HTMLDivElement,
  LanguageDropdownButtonProps
>((props, ref) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { setLanguage, languages, t } = useLanguage();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <props.icon />
      </IconButton>
      <Menu ref={ref} anchorEl={anchorEl} open={open} onClose={handleClose}>
        {languages.map((lang) => {
          return (
            <MenuItem
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                handleClose();
              }}
            >
              <Typography variant="caption">
                {Language.getTranslation(lang.code)}
              </Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
});
