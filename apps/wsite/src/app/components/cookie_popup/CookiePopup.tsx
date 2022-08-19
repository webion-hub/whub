import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { useTranslation } from 'react-i18next';
import { IconButton, Link, Slide, SnackbarContent, Stack, Typography } from '@mui/material';
import Cookies from 'js-cookie'
import ReactPixel from 'react-facebook-pixel';
import { CloseRounded } from '@mui/icons-material';

export interface State extends SnackbarOrigin {
  readonly open: boolean;
}

export default function CookiePopup() {
  const [open, setOpen] = useState<boolean>(false)
  const { t } = useTranslation()

  useEffect(() => {
    const got = Cookies.get('webion');
    if(got)
      return;

    setOpen(true);
  }, [])


  const handleClick = () => {
    Cookies.set(
      'webion',
      'true',
      { expires: 365, secure: true }
    )

    ReactPixel.grantConsent()
    setOpen(false);
  }

  const handleClose = () => {
    Cookies.set(
      'webion',
      'false',
      { expires: 365, secure: true }
    )

    ReactPixel.revokeConsent()
    setOpen(false);
  }


  const action = (
    <Stack
      direction="row"
      spacing={1}
    >
      <Button
        onClick={handleClick}
        color="inherit"
        size="small"
        sx={{ transform: 'scale(0.8)' }}
      >
        {t("decline")}
      </Button>
      <Button
        onClick={handleClick}
        color= "secondary"
        variant="contained"
        size="small"
      >
        {t("accept")}
      </Button>
    </Stack>
  )

  return (
    <Snackbar
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom"
      }}
      open={open || true}
      TransitionComponent={Slide}
    >
      <SnackbarContent
        sx={{
          backgroundColor: "background.paper",
          color: "white",
          flexDirection: 'column'
        }}
        action={action}
        message={
          <Typography variant='caption'>
            {t("cookies")}
            <br/>
            <Link
              onClick={() => window.open("/policies-licenses", '_blank')?.focus()}
            >
              {t('privacy-link')}
            </Link>
          </Typography>
        }
      />
    </Snackbar>
  )
}
