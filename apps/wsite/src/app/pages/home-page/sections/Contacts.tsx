import { Box, Typography, Link, useTheme, Stack } from "@mui/material";
import { Form, FormGroup, Img, InputValidator, PrivacyCheckBox, ResponserGrid, Validators, WuiGrid } from "@whub/wui";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LightModeLoadingButton } from "../../../components/light_mode/LightModeLoadingButton";
import { LightModeTextField } from "../../../components/light_mode/LightModeTextField";

import SendRoundedIcon from '@mui/icons-material/SendRounded';

import ReactPixel from 'react-facebook-pixel';
import { useContactUsApi } from "@whub/apis-react";

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

export default function Contacts() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const contactUsApi = useContactUsApi()
  const theme = useTheme()
  const borderRadius = theme.spacing(5)
  const textColor = theme.palette.grey[600]
  const nameSurnameWidth = `calc(50% - ${theme.spacing(0.5)})`

  const { t } = useTranslation();

  const handleSubmit = (form: Form) => {
    setSuccess(false)

    if(!form.isFormValid())
      return

    setLoading(true)

    contactUsApi.contactUs
      .process(form.getValues())
      .then(() => setSuccess(true))
      .finally(() => setLoading(false))
  };


  return (
    <Box
      sx={{
        backgroundColor: { xs: "white", sm: "white", md: "transparent" },
        backgroundImage: {
          md: "url('assets/images/circle.svg')",
          xs: "none",
        },
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        paddingTop: 0,
        marginTop: 0,
        borderRadius: {
          md: 0,
          sm: `${borderRadius} 0px 0px ${borderRadius}`,
          xs: `${borderRadius} ${borderRadius} 0px 0px`,
        },
        width: "100%",
      }}
    >
      <ResponserGrid
        type="upper"
        size="md"
        sx={{
          maxWidth: 1100,
          minHeight: 800,
          margin: "auto",
          paddingBottom: 4,
          paddingTop: 8,
          width: "90%",
        }}
      >
        <Box sx={{
          width: '50%',
          margin: "auto",
        }}>
          <Img
            alt="Contact"
            src="assets/images/contact.svg"
            sx={{ width:"100%", margin:"auto" }}
          />
        </Box>

        <Stack
          direction="column"
          spacing={4}
          sx={{ width: { sx: "95%", md: "50%" } }}
        >
          <Typography
            variant="h2"
            color="primary.dark"
            sx={{ textAlign: { xs: "center", lg: "left" } }}
          >
            {t("contact-us-title")}
          </Typography>
          <Typography
            color={textColor}
            variant="body2"
            sx={{ textAlign: { xs: "center", lg: "left" } }}
          >
            {t("contact-us-description")}
            <Link
              href="tel:+39 389 008 6632"
              sx={{
                color: textColor,
                textDecoration: "none",
                borderBottom: `1px solid ${textColor}`
              }}
            >
              {' +39 389 008 6632'}
            </Link>
          </Typography>
          <FormGroup
            onSubmit={handleSubmit}
            sx={{ "& > *": { marginBlock: theme.spacing(0.5, '!important') }}}
          >
            <InputValidator
              value=''
              name="name"
              validators={[Validators.required]}
            >
              <TextfieldBase
                required
                label={t("name")}
                sx={{ width: nameSurnameWidth, marginRight: 0.5 }}
              />
            </InputValidator>

            <InputValidator
              value=''
              name="surname"
              validators={[Validators.required]}
            >
              <TextfieldBase
                required
                label={t("surname")}
                sx={{ width: nameSurnameWidth, marginLeft: 0.5 }}
              />
            </InputValidator>

            <InputValidator
              value=''
              name="phoneNumber"
              validators={[Validators.isATelephoneNumber]}
            >
              <TextfieldBase
                fullWidth
                label={t("phone-number")}
              />
            </InputValidator>

            <InputValidator
              value=''
              name="email"
              validators={[Validators.required, Validators.isAnEmail]}
            >
              <TextfieldBase
                required
                fullWidth
                label={t("email")}
              />
            </InputValidator>

            <InputValidator
              value=''
              name="message"
              validators={[Validators.required]}
            >
              <TextfieldBase
                required
                fullWidth
                multiline
                rows={4}
                label={t("message")}
              />
            </InputValidator>

            <InputValidator
              name="privacy"
              value={true}
              validators={[Validators.required]}
            >
              <PrivacyCheckBox privacyUrl="/policies-licenses"/>
            </InputValidator>

            <WuiGrid
              container
              direction="row"
              alignItems="center"
              spacing={2}
            >
              <LightModeLoadingButton
                loading={loading}
                type="submit"
                variant="contained"
                size="large"
                loadingPosition="start"
                sx={{ width: 190, zIndex: 1 }}
                startIcon={<SendRoundedIcon/>}
                onClick={() => {
                  ReactPixel.track('Contact');
                }}
              >
                {t("contact-us-button")}
              </LightModeLoadingButton>
              <Typography
                color={textColor}
                variant="body2"
                sx={{
                  opacity: success ? 1 : 0,
                  transform: success ? 'translateX(0%)' : 'translateX(-100%)',
                  transition: theme => `
                    ${theme.transitions.duration.standard}ms opacity ease-in-out,
                    ${theme.transitions.duration.standard}ms transform ease-in-out
                  `,
                }}
              >
                {t('message-sent')}
              </Typography>
            </WuiGrid>

          </FormGroup>
        </Stack>
      </ResponserGrid>
    </Box>
  );
}
