import CallRoundedIcon from '@mui/icons-material/CallRounded';
import {
  Box,
  Button,
  Grid,
  Link,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { ResponserGrid, useGlobalDialogs, useLanguage } from '@whub/wui';

const StyledMap = styled('iframe')(() => ({
  borderRadius: 8,
  border: 0,
}));

export default function MapSection() {
  const { openDialog } = useGlobalDialogs();

  const { t } = useLanguage();
  return (
    <Stack direction="column">
      <ResponserGrid
        type="upper"
        size="lg"
        GridProps={{
          justifyContent: 'center',
          alignItems: 'center',
          sx: {
            paddingInline: { xs: 4, md: 12 },
            paddingBlock: 3,
          },
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', lg: '40%' },
            marginRight: { xs: 0, lg: 4 },
            marginBottom: { xs: 4, lg: 0 },
          }}
        >
          <Typography variant="h3" textAlign="center">
            {t('who-are-we')}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              marginTop: 2,
              textAlign: 'left',
            }}
          >
            {t('contact-us-description-p1')}
            <br />
            <br />
            {t('contact-us-description-p2')}
            <br />
            <br />
            {t('contact-us-description-p3')}
            <br />
            <br />
            {t('contact-us-description-p4')}
            <br />
            <br />
          </Typography>
        </Box>
        <Grid
          container
          direction="column"
          sx={{ width: { xs: '100%', lg: 'auto' } }}
        >
          <StyledMap
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2844.025110540569!2d11.410952051791064!3d44.53511840286884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477e2ce4005a1bf3%3A0x93f774b37f64da61!2sVia%20Gian%20Luigi%20Lazzari%2C%2018%2C%2040057%20Quarto%20Inferiore%20BO!5e0!3m2!1sit!2sit!4v1662195793282!5m2!1sit!2sit"
            sx={{
              width: { xs: '100%', lg: 600 },
              height: { xs: 225, lg: 450 },
            }}
          />
          <Link
            variant="caption"
            textAlign="center"
            color="secondary"
            target="_blank"
            href="https://www.google.com/maps?ll=44.535115,11.413146&z=16&t=m&hl=it&gl=IT&mapclient=embed&q=Via+Gian+Luigi+Lazzari,+18+40057+Quarto+Inferiore+BO"
          >
            {t('address-link')}
          </Link>
        </Grid>
      </ResponserGrid>
      <Button
        variant="contained"
        size="large"
        onClick={() => openDialog('contacts')}
        sx={{
          margin: 'auto',
          textTransform: 'capitalize',
        }}
        startIcon={<CallRoundedIcon />}
      >
        {t('contact-us-button')}
      </Button>
    </Stack>
  );
}
