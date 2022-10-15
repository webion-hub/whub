import { IconButton, Paper, Stack, TextField, Typography } from '@mui/material';

import { PersonRounded, Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Form,
  FormGroup,
  Img,
  InputValidator,
  NextImg,
  Page,
  useLanguage,
  useLayout,
  useNextNavigator,
  Validators,
} from '@whub/wui';
import React, { useEffect, useState } from 'react';

import { ShopRoutes } from '@whub/wshop-ui';
import { useAuth } from '@whub/apis-react';

interface State {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}

export default function Login() {
  const { logIn, isLogged } = useAuth();
  const { setLoading: setAppBarLoding } = useLayout();
  const { navigate } = useNextNavigator();
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (isLogged) navigate(ShopRoutes.PRODUCTS_TABLE);
  }, [isLogged]);

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

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const login = async (form: Form) => {
    setLoading(true);
    setAppBarLoding(true)
    const success = await logIn(form.getValues())
    setLoading(false);
    setAppBarLoding(false)

    if(success)
      return

    form.setIsValid('username')(false);
    form.setIsValid('password')(false);
  };

  return (
    <Page
      centered
    >
      <FormGroup onSubmit={login} sx={{ padding: 2, width: '100%' }}>
        <Stack
          spacing={2}
          component={Paper}
          direction="column"
          alignContent="center"
          justifyContent="center"
          sx={{
            marginInline: 'auto',
            width: '100%',
            maxWidth: 350,
            padding: 2,
          }}
        >
          <NextImg
            alt="simm-logo"
            auto
            width="80px"
            src="/assets/images/logo.webp"
            sx={{
              margin: 'auto',
              marginBlock: 2,
            }}
          />
          <Typography
            variant="h5"
            fontWeight="700"
            sx={{
              textAlign: 'center',
              marginBottom: 2,
            }}
          >
            Log in
          </Typography>

          <InputValidator
            name="username"
            value=""
            validators={[Validators.required]}
          >
            <TextField
              required
              size="small"
              fullWidth
              color="secondary"
              label={t('username')}
              variant="outlined"
              InputProps={{ endAdornment: <PersonRounded /> }}
            />
          </InputValidator>
          <InputValidator
            name="password"
            value=""
            validators={[Validators.required]}
          >
            <TextField
              required
              variant="outlined"
              label={t('password')}
              size="small"
              color="secondary"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
          </InputValidator>

          <LoadingButton
            color="primary"
            type="submit"
            variant="contained"
            loading={loading}
          >
            {t('enter')}
          </LoadingButton>
        </Stack>
      </FormGroup>
    </Page>
  );
}
