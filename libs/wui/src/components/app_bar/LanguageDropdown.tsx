import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { Language } from '../../lib/Language';
import { useLanguage } from '../../hooks/useLanguage';

export interface LanguageDropdownButtonProps {
  readonly icon: any,
}

const LanguageDropdownButton = React.forwardRef<HTMLDivElement, LanguageDropdownButtonProps>((props, ref) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation();
  const { setLanguage } = useLanguage();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const texts = Language.LANGUAGES.map((el, _i) => {
    return {
      long: t(el),
      short: el,
    }
  })

  return (
    <>
      <Button
        onClick={handleClick}
        color="inherit"
      >
        <props.icon />
      </Button>
      <Menu
        ref={ref}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {texts.map((text) => {
          return(
            <MenuItem
              key={text.short}
              onClick={() => {
                setLanguage(text.short)
                handleClose()
              }}
            >
              <Typography variant="caption">
                {text.long}
              </Typography>
            </MenuItem>
          )
        })}
      </Menu>
    </>
  );
});

export default LanguageDropdownButton
