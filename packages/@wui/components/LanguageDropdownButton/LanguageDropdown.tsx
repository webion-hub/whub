import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { IconButton, Typography } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import orderBy from 'lodash/orderBy';
import useLanguage from '@wui/wrappers/useLanguage';

export interface LanguageDropdownButtonProps {
  readonly icon: OverridableComponent<any>;
}

export const LanguageDropdownButton = React.forwardRef<
  HTMLDivElement,
  LanguageDropdownButtonProps
>((props, ref) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { setLanguage, languages, language } = useLanguage();

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
        {
          orderBy(languages, (lang) => lang.code !== language?.code)
          .map((lang) => {
            return (
              <MenuItem
                key={lang.code}
                selected={lang.code === language?.code}
                disabled={lang.code === language?.code}
                onClick={() => {
                  setLanguage(lang.code);
                  handleClose();
                }}
              >
                <Typography variant="caption">
                  {lang.langTranslation}
                </Typography>
              </MenuItem>
            );
          })
        }
      </Menu>
    </>
  );
});

LanguageDropdownButton.displayName = "LanguageDropdownButton"