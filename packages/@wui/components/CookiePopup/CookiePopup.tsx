import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import Slide from '@mui/material/Slide';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import Button from '@mui/material/Button';

import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import useLanguage from '@wui/wrappers/useLanguage';

export interface CookiePopupProps {
  readonly name: string;
  readonly privacyUrl: string;
  readonly usePixel?: boolean;
}

export interface State extends SnackbarOrigin {
  readonly open: boolean;
}

export function CookiePopup(props: CookiePopupProps) {
  const [open, setOpen] = useState<boolean>(false);
  const { t } = useLanguage();

  useEffect(() => {
    const got = Cookies.get(props.name);
    if (got) return;

    setOpen(true);
  }, []);

  const handleClick = async () => {
    Cookies.set(props.name, 'true', { expires: 365, secure: true });

    //const pixel = await getPixel();
    //props.usePixel && pixel.grantConsent();
    setOpen(false);
  };

  const handleClose = async () => {
    Cookies.set(props.name, 'false', { expires: 365, secure: true });

    //const pixel = await getPixel();
    //props.usePixel && pixel.revokeConsent();
    setOpen(false);
  };

  const getPixel = async () => {
    //TODO
    //return await import('react-facebook-pixel').then((m) => m.default);
  };

  const action = (
    <Stack direction="row" spacing={1}>
      <Button
        onClick={handleClose}
        color="inherit"
        size="small"
        sx={{ transform: 'scale(0.8)' }}
      >
        {t('decline')}
      </Button>
      <Button
        onClick={handleClick}
        color="secondary"
        variant="contained"
        size="small"
      >
        {t('accept')}
      </Button>
    </Stack>
  );

  return (
    <Snackbar
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'bottom',
      }}
      open={open}
      TransitionComponent={Slide}
    >
      <Alert severity="info">
        <Typography variant="caption">
          <Stack direction="column" alignItems="flex-end" spacing={1}>
            {t('cookies')}
            <br />
            <Stack direction="row" sx={{ width: '100%' }}>
              <Link
                color="info.contrastText"
                href={props.privacyUrl}
                target="_blank"
              >
                {t('privacy-link')}
              </Link>
            </Stack>
            {action}
          </Stack>
        </Typography>
      </Alert>
    </Snackbar>
  );
}
