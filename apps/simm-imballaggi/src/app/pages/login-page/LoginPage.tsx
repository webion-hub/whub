import { IconButton, Button, Paper, Stack, TextField, Typography } from '@mui/material'

import MailRoundedIcon from '@mui/icons-material/MailRounded';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useTranslation } from "react-i18next";
import React from 'react';
import { Form, FormGroup, Img, InputValidator, Page, Validators } from '@whub/wui';
import { useAuthApi } from '@whub/apis-react';

interface State {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}

export default function LoginPage() {
  const authApi = useAuthApi();
  const { t } = useTranslation();

  const [values, setValues] = React.useState<State>({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const login = (form: Form) => {
    authApi.account
      .login(form.getValues())
      .then(res => console.log(res))
  }

  return (
    <Page centered>
      <FormGroup
        onSubmit={login}
      >
        <Stack
          spacing={2}
          component={Paper}
          direction="column"
          alignContent="center"
          justifyContent="center"
          sx={{
            marginInline: "auto",
            width: '100%',
            maxWidth: 350,
            padding: 2,
          }}
        >
          <Img
            src="assets/images/logo.png"
            sx={{
              width: 80,
              margin: "auto",
              marginBlock: 2,
            }}
          />
          <Typography
            variant="h5"
            fontWeight="700"
            sx={{
              textAlign:"center",
              marginBottom: 2,
            }}
          >
            Log in
          </Typography>

          <InputValidator
            name='username'
            value=""
            validators={[Validators.required]}
          >
            <TextField
              required
              size="small"
              fullWidth
              label="Nome utente"
              variant="outlined"
              InputProps={{ endAdornment: <MailRoundedIcon/>}}
            />
          </InputValidator>
          <InputValidator
            name='password'
            value=""
            validators={[Validators.required]}
          >
            <TextField
              required
              variant="outlined"
              label="Password"
              size="small"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              InputProps={{ endAdornment:
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>,
              }}
            />
          </InputValidator>

          <Typography
            variant="caption"
            sx={{
              textAlign:"right",
              marginBlock: theme => theme.spacing(0, "!important"),
            }}
          >
            {t("forgot-password")}
          </Typography>
          <Button
            color="primary"
            type="submit"
            variant="contained"
          >
            {t("enter")}
          </Button>
        </Stack>
      </FormGroup>
    </Page>
  )
}
