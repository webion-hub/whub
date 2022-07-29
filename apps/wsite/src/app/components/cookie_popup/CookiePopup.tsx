import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { useTranslation } from 'react-i18next';
import { Link, Slide, SnackbarContent, Typography } from '@mui/material';
import Cookies from 'js-cookie'

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
    setOpen(false);
  }

  const action = (
    <Button 
      onClick={handleClick}
      color= "secondary"
      variant="contained"
      size="small"
    >
      {t("accept")}
    </Button>
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
              Privacy & Policy
            </Link>
          </Typography>
        }
      />
    </Snackbar>
  )
}
