import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';
import { Language, Languages, useLanguage } from '@whub/wui';

import { IT, GB, ES } from 'country-flag-icons/react/3x2'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';

export interface FlagLanguageDropdownProps {
  readonly icon?: any,
}


const FlagLanguageDropdown = React.forwardRef<HTMLDivElement, FlagLanguageDropdownProps>((props, ref) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  const flags: { [id: string] : any; } = {
    "en": <GB width="28px" style={{borderRadius: 2}}/>,
    "it": <IT width="28px" style={{borderRadius: 2}}/>,
    "es": <ES width="28px" style={{borderRadius: 2}}/>,
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const texts: {long: string; short: Languages;}[] = Language.LANGUAGES.map((el: Languages, _i: number) => {
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
        {flags[language]}
        {
          open 
            ? <ExpandLessRoundedIcon color="primary"/>
            : <ExpandMoreRoundedIcon color="primary"/>
        }
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
              {flags[text.short]}
              <Typography 
                variant="caption" 
                sx={{
                  marginLeft: 1
                }}
              >
                {text.long}
              </Typography>
            </MenuItem>
          )
        })}
      </Menu>
    </>
  );
});

export default FlagLanguageDropdown
