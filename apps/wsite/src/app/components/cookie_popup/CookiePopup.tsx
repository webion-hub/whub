import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { useTranslation } from 'react-i18next';
import { Link, Slide, SnackbarContent, Stack, Typography } from '@mui/material';
import Cookies from 'js-cookie'
import ReactPixel from 'react-facebook-pixel';

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
        onClick={handleClose}
        color="inherit"
        variant="text"
        size="small"
      >
        {t("close")}
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
      open={open}
      TransitionComponent={Slide}
    >
      <SnackbarContent
        sx={{
          backgroundColor: "background.paper",
          color: "white"
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
