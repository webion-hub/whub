import DevicesRounded from "@mui/icons-material/DevicesRounded";
import FactoryRounded from "@mui/icons-material/FactoryRounded";
import KeyboardArrowDownRounded from "@mui/icons-material/KeyboardArrowDownRounded";
import PhoneIphoneRounded from "@mui/icons-material/PhoneIphoneRounded";
import { Button, ListItemIcon, ListItemText, Menu, MenuItem, Theme } from "@mui/material";
import { SxProps } from "@mui/system";
import { useNextNavigator } from "@wui/core";
import { useLanguage } from "@wui/wrappers";
import { useState } from "react";

export function ServicesButton() {
  const { t } = useLanguage();
  const { clickNavigate } = useNextNavigator();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = (url: string) => (e: any) => {
    clickNavigate(url)(e);
    handleClose();
  };

  const listItemSx: SxProps<Theme> = {
    paddingLeft: (theme) => theme.spacing(3, '!important'),
    paddingRight: (theme) => theme.spacing(8, '!important'),
    marginBlock: 2,
  };

  return (
    <>
      <Button
        color="inherit"
        onClick={handleClick}
        endIcon={<KeyboardArrowDownRounded />}
        sx={{
          '& .MuiButton-endIcon': {
            transition: '0.25s transform',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          },
        }}
      >
        {t('navbar-button2')}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={navigate('/services/websites')}
          sx={listItemSx}
          selected={false}
        >
          <ListItemIcon>
            <DevicesRounded color="primary" />
          </ListItemIcon>
          <ListItemText primary={t('service1')} secondary={t('learn-more')} />
        </MenuItem>
        <MenuItem onClick={navigate('/services/apps')} sx={listItemSx}>
          <ListItemIcon>
            <PhoneIphoneRounded color="primary" />
          </ListItemIcon>
          <ListItemText primary={t('service2')} secondary={t('learn-more')} />
        </MenuItem>
        <MenuItem onClick={navigate('/services/industry')} sx={listItemSx}>
          <ListItemIcon>
            <FactoryRounded color="primary" />
          </ListItemIcon>
          <ListItemText primary={t('service3')} secondary={t('learn-more')} />
        </MenuItem>
      </Menu>
    </>
  );
}
