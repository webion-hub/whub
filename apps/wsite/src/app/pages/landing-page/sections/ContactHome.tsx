import { Box, Typography, Link, useTheme, Grid, Stack, Snackbar, Alert } from "@mui/material";
import { api } from "@whub/api";
import { Form, FormGroup, Img, InputValidator, ResponserGrid, Validators, WuiGrid } from "@whub/wui";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LightModeLoadingButton } from "../../../components/light_mode/LightModeLoadingButton";
import { LightModeTextField } from "../../../components/light_mode/LightModeTextField";

import PrivacyCheckBox from "../../../components/privacy_checkbox/PrivacyCheckbox";
import SendRoundedIcon from '@mui/icons-material/SendRounded';

import ReactPixel from 'react-facebook-pixel';

const TextfieldBase = ({...props}) => {
  const theme = useTheme()
  const textColor = theme.palette.grey[600]

  return (
    <LightModeTextField
      {...props}
      size="small"
      variant="outlined"
      InputProps={{
        sx: { color: `${textColor}`},
      }}
      InputLabelProps={{ sx: { color: `${textColor}` } }}
    />
  )
}

export default function ContactHome() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const theme = useTheme()
  const borderRadius = theme.spacing(5)
  const textColor = theme.palette.grey[600]

  const { t } = useTranslation();

  const handleSubmit = (form: Form) => {
    setSuccess(false)

    if(!form.isFormValid())
      return

    setLoading(true)

    api.contactUs
      .process({
        ...form.getValues(),
        surname: 'Webion2437'
      })
      .then(() => setSuccess(true))
      .finally(() => setLoading(false))
  };


  return (
    <Box
      sx={{
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        maxWidth: "100%",
        paddingTop: 0,
        marginTop: 0,
        borderRadius: {
          md: 0,
          sm: `${borderRadius} 0px 0px ${borderRadius}`,
          xs: `${borderRadius} ${borderRadius} 0px 0px`,
        },

        padding: {xs:1, sm:3},
        width: "500px",
      }}
    >

          <FormGroup
            onSubmit={handleSubmit}
            sx={{ "& > *": { marginBlock: theme.spacing(0.5, '!important') },
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            border: "1px solid #444444",
            maxWidth: "100%",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            backdropFilter: "blur(19px)",
              borderRadius: "13px",
              padding: {xs:2, sm:3},
              height: "fit-content"
            }}
          >
            <Typography variant="h4" sx={{fontAlign: ""}}>Contattaci</Typography>
            <Typography variant="subtitle2">Sei pronto a creare qualcosa di memorabile?
            Siamo pronti ad aiutare</Typography>
            <InputValidator
              name="name"
              validators={[Validators.required]}
            >
              <TextfieldBase
                required
                label="Nome"
                sx={{width: "100%"}}
              />
            </InputValidator>

            <InputValidator
              name="email"
              validators={[Validators.required, Validators.isAnEmail]}
            >
              <TextfieldBase
                required
                fullWidth
                label="Email"
              />
            </InputValidator>

            <InputValidator
              name="message"
              validators={[Validators.required]}
            >
              <TextfieldBase
                required
                fullWidth
                multiline
                rows={4}
                label="Messaggio"
              />
            </InputValidator>

            <InputValidator
              name="privacy"
              value={true}
              validators={[Validators.required]}
            >
              <PrivacyCheckBox/>
            </InputValidator>

            <WuiGrid
              container
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{width: "100%"}}
            >
              <LightModeLoadingButton
                loading={loading}
                type="submit"
                variant="contained"
                size="large"
                loadingPosition="start"
                sx={{ width: "100%", zIndex: 1 }}
                startIcon={<SendRoundedIcon/>}
                onClick={() => {
                  ReactPixel.track('Contact');
                }}
              >
                Ottieni oggi una consulenza gratuita
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
                  Messaggio inviato!
                </Alert>
              </Snackbar>
    </Box>
  );
}
