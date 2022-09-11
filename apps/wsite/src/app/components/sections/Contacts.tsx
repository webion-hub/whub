import { Box, Typography, Link, useTheme, Stack, Button } from "@mui/material";
import { Form, FormGroup, Img, InputValidator, PrivacyCheckBox, ResponserGrid, SquareButton, Validators, WuiGrid } from "@whub/wui";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LightModeLoadingButton } from "../light_mode/LightModeLoadingButton";
import { LightModeTextField } from "../light_mode/LightModeTextField";

import SendRoundedIcon from '@mui/icons-material/SendRounded';

import ReactPixel from 'react-facebook-pixel';
import { useContactUsApi } from "@whub/apis-react";
import { WebionRepository } from "../../lib/WebionRepositiory";
import { AdbRounded, FactoryRounded, LanguageRounded, PendingRounded } from "@mui/icons-material";

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
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={3}
      sx={{ paddingBlock: 8 }}
    >
      <Typography
        variant="h2"
        component="h4"
        align="center"
        color="primary.dark"
      >
        Quale servizio hai bisogno?
      </Typography>
      <Typography
        align="center"
        color="info.dark"
        variant="body2"
        sx={{ maxWidth: 800 }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas semper nisi quis dolor tincidunt, a venenatis libero bibendum. Nulla tristique at lacus vitae rutrum. Nam hendrerit nisl id justo sollicitudin, vel pharetra justo hendrerit.
      </Typography>

      <Stack
        direction="row"
        spacing={2}
      >
        <SquareButton
          size={102}
          icon={LanguageRounded}
          label="Sito web"
        />
        <SquareButton
          size={102}
          icon={AdbRounded}
          label="App"
        />
        <SquareButton
          size={102}
          icon={FactoryRounded}
          label="Industria 4.0"
        />
        <SquareButton
          size={102}
          icon={PendingRounded}
          label="Altro"
        />
      </Stack>
      <Stack
        direction="row"
        justifyContent="flex-end"
        sx={{ width: '100%' }}
      >
        <Button
          variant="contained"
        >
          Avanti
        </Button>
      </Stack>
    </Stack>
  );
}
