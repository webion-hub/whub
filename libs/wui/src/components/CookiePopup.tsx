import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { useTranslation } from 'react-i18next';
import { Alert, Link, Slide, SnackbarContent, Stack, Typography } from '@mui/material';
import Cookies from 'js-cookie'
import ReactPixel from 'react-facebook-pixel';

export interface CookiePopupProps {
  readonly name: string,
  readonly privacyUrl: string,
  readonly usePixel?: boolean
}

export interface State extends SnackbarOrigin {
  readonly open: boolean;
}

export function CookiePopup(props: CookiePopupProps) {
  const [open, setOpen] = useState<boolean>(false)
  const { t } = useTranslation()

  useEffect(() => {
    const got = Cookies.get(props.name);
    if(got)
      return;

    setOpen(true);
  }, [])


  const handleClick = () => {
    Cookies.set(
      props.name,
      'true',
      { expires: 365, secure: true }
    )

    props.usePixel && ReactPixel.grantConsent()
    setOpen(false);
  }

  const handleClose = () => {
    Cookies.set(
      props.name,
      'false',
      { expires: 365, secure: true }
    )

    props.usePixel && ReactPixel.revokeConsent()
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
      open={open}
      TransitionComponent={Slide}
    >
      <Alert
        severity="info"
      >
        <Stack
          direction="column"
          alignItems="flex-end"
          spacing={1}
        >
          {t("cookies")}
          <br/>
          <Link
            color="secondary"
            href={props.privacyUrl}
            target="_blank"
          >
            {t('privacy-link')}
          </Link>
          {action}
        </Stack>
      </Alert>
    </Snackbar>
  )
}
