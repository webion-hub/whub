import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Slide from '@mui/material/Slide';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useCookie } from '@wui/wrappers/Cookie/CookieWrapper';
import useLanguage from '@wui/wrappers/useLanguage';

export interface CookiePopupProps {
  readonly privacyUrl: string;
}

export interface State extends SnackbarOrigin {
  readonly open: boolean;
}

export function CookiePopup(props: CookiePopupProps) {
  const { accept, decline, openPopup } = useCookie();
  const { t } = useLanguage();

  const action = (
    <Stack direction="row" spacing={1}>
      <Button
        onClick={decline}
        color="inherit"
        size="small"
        sx={{ transform: 'scale(0.8)' }}
      >
        {t('decline')}
      </Button>
      <Button
        onClick={accept}
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
      open={openPopup}
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
