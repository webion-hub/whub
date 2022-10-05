import { SendRounded } from '@mui/icons-material';
import {
  Alert,
  Box,
  Snackbar,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useContactUs } from '@whub/apis-react';
import {
  Form,
  FormGroup,
  InputValidator,
  PrivacyCheckBox,
  ResponserGrid,
  RotatingText,
  useLanguage,
  Validators,
  WuiGrid,
} from '@whub/wui';
import { useState } from 'react';

import { LightModeLoadingButton } from '../light_mode/LightModeLoadingButton';
import { LightModeTextField } from '../light_mode/LightModeTextField';
import ReactPixel from 'react-facebook-pixel';

export default function ContactUsHome() {
  const { t } = useLanguage();

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      sx={{
        minHeight: '470px',
        justifyContent: 'space-between',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        maxWidth: '100%',
        paddingInline: { xs: 0.3, sm: 2 },
      }}
    >
      <Stack
        direction="column"
        alignItems="flex-end"
        sx={{
          width: '100%',
          maxWidth: 750,
          height: 'clamp(300px, calc(95vh - 370px), 700px)',
          marginLeft: 0,
          marginBlock: 4,
          paddingInline: 3,
          justifyContent: 'center',
        }}
      >
        <Typography
          color="text.primary"
          variant="h4"
          textAlign="end"
          sx={{
            marginLeft: 0,
            fontWeight: 'bold',
            fontSize: { xs: '20px', sm: '24px !important' },
          }}
        >
          {t('landing-page-title')}
        </Typography>
        <Typography
          color="text.primary"
          variant="h1"
          textAlign="end"
          sx={{
            marginLeft: 0,
            fontWeight: 'bold',
            fontSize: { xs: '35px', sm: '48px !important' },
          }}
        >
          {t('landing-page-subtitle-start')}
          <br />
          <RotatingText
            labels={[
              t('stories'),
              t('results'),
              t('solutions'),
              t('services'),
              t('products'),
            ]}
            width={{ xs: 160, sm: 220 }}
            sx={{
              color: 'yellow',
              marginRight: 1,
              textAlign: 'end',
            }}
          />
          {t('landing-page-subtitle-end')}
        </Typography>
      </Stack>
      <Box
        sx={{
          width: '100%',
          margin: 'auto',
          maxWidth: 500,
        }}
      >
        <ContactUsSmallForm />
      </Box>
    </Stack>
  );
}

const TextfieldBase = ({ ...props }) => {
  const theme = useTheme();
  const textColor = theme.palette.grey[600];

  return (
    <LightModeTextField
      {...props}
      size="small"
      variant="outlined"
      InputProps={{
        sx: { color: `${textColor}` },
      }}
      InputLabelProps={{ sx: { color: `${textColor}` } }}
    />
  );
};

function ContactUsSmallForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const theme = useTheme();
  const contactUsApi = useContactUs().api;
  const borderRadius = theme.spacing(5);

  const { t } = useLanguage();

  const handleSubmit = (form: Form) => {
    setSuccess(false);

    if (!form.isFormValid()) return;

    setLoading(true);

    contactUsApi.contactUs
      .process({
        ...form.getValues(),
        surname: 'Webion2437',
      })
      .then(() => setSuccess(true))
      .finally(() => setLoading(false));
  };

  return (
    <Box
      sx={{
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        paddingTop: 0,
        marginTop: 0,
        borderRadius: {
          md: 0,
          sm: `${borderRadius} 0px 0px ${borderRadius}`,
          xs: `${borderRadius} ${borderRadius} 0px 0px`,
        },
        padding: { xs: 1, sm: 3 },
      }}
    >
      <FormGroup
        onSubmit={handleSubmit}
        sx={{
          '& > *': { marginBlock: theme.spacing(0.5, '!important') },
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          border: '1px solid #444444',
          maxWidth: '100%',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          backdropFilter: 'blur(19px)',
          borderRadius: '13px',
          padding: { xs: 2, sm: 3 },
          height: 'fit-content',
        }}
      >
        <Typography variant="h4" sx={{ fontAlign: '' }}>
          {' '}
          {t('contact-us-title')}
        </Typography>
        <Typography variant="subtitle2" sx={{ marginBottom: 5 }}>
          {t('are-you-ready')}
        </Typography>
        <InputValidator value="" name="name" validators={[Validators.required]}>
          <TextfieldBase required label={t('name')} sx={{ width: '100%' }} />
        </InputValidator>

        <InputValidator
          value=""
          name="email"
          validators={[Validators.required, Validators.isAnEmail]}
        >
          <TextfieldBase required fullWidth label="Email" />
        </InputValidator>

        <InputValidator
          value=""
          name="message"
          validators={[Validators.required]}
        >
          <TextfieldBase
            required
            fullWidth
            multiline
            rows={4}
            label={t('message')}
          />
        </InputValidator>

        <InputValidator
          name="privacy"
          value={true}
          validators={[Validators.required]}
        >
          <PrivacyCheckBox privacyUrl="/policies-licenses" color="#888" />
        </InputValidator>

        <WuiGrid
          container
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{ width: '100%' }}
        >
          <LightModeLoadingButton
            loading={loading}
            type="submit"
            variant="contained"
            size="large"
            loadingPosition="start"
            sx={{ width: '100%', zIndex: 1, textTransform: 'none' }}
            startIcon={<SendRounded />}
            onClick={() => {
              ReactPixel.track('Contact');
            }}
          >
            {t('free-quote')}
          </LightModeLoadingButton>
        </WuiGrid>
      </FormGroup>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          {t('message-sent')}
        </Alert>
      </Snackbar>
    </Box>
  );
}
