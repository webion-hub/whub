import BasicThemeButton from '@wui/components/BasicThemeButton'
import { AppBar, AppBarContent, AppBarSection, AppBarLogo } from '@wui/layout/AppBar'
import { Avatar, Button, ButtonBase, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';

import EnergySavingsLeafRoundedIcon from '@mui/icons-material/EnergySavingsLeafRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import BackupTableRoundedIcon from '@mui/icons-material/BackupTableRounded';

import { useNextNavigator } from '@wui/core';
import useLanguage from '@wui/wrappers/useLanguage';
import { useState } from 'react';

export default function IvyAppBar() {
  const { t } = useLanguage()
  const { getClickNavigate } = useNextNavigator();

  return (
    <AppBar>
      <AppBarContent>
        <AppBarSection 
          alignment='start' 
          spacing={4}
        >
          <AppBarLogo
            {...getClickNavigate('/')}
            label={t('ivy')}
          >
            <EnergySavingsLeafRoundedIcon/>
          </AppBarLogo>
          <Button
            {...getClickNavigate('/frame')}
            startIcon={<BackupTableRoundedIcon/>}
          >
            {t('frame')}
          </Button>
          <Button
            {...getClickNavigate('/settings')}
            startIcon={<SettingsRoundedIcon/>}
          >
            {t('settings')}
          </Button>
        </AppBarSection>
        <AppBarSection 
          alignment='end'
          spacing={4}  
        >
          <BasicThemeButton/>
          <User/>
        </AppBarSection>
      </AppBarContent>
    </AppBar>
  )
}

function User() {
  const { t } = useLanguage()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ButtonBase
        sx={{ borderRadius: '100%' }}
        onClick={handleClick}
      >
        <Avatar/>
      </ButtonBase>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <AccountBoxRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            {t('profile')}
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <ExitToAppRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            {t('logout')}
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}