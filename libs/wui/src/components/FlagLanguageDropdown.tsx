import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';

import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { LanguageItem, useLanguage } from '../contexts/ContextLanguage';

export const FlagLanguageDropdown = React.forwardRef<
  HTMLDivElement,
  Record<string, never>
>((_props, ref) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { language, languages, setLanguage } = useLanguage();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const flag = (lang: LanguageItem) =>
    lang.flag && <lang.flag width="28px" style={{ borderRadius: 2 }} />;

  return (
    <>
      <Button onClick={handleClick} color="inherit">
        {language && flag(language)}
        <ExpandMoreRoundedIcon
          color="primary"
          sx={{
            transition: '0.25s transform',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </Button>
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
              {flag(lang)}
              <Typography
                variant="caption"
                sx={{
                  marginLeft: 1,
                }}
              >
                {lang.langTranslation}
              </Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
});
