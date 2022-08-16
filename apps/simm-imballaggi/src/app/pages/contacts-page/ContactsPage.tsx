import { Button, Grid, Link, Paper, Stack, TextField, Typography, useTheme } from '@mui/material'
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import { api } from '@whub/api';
import { FormGroup, useBackgroundWaves, useForm, Validators } from '@whub/wui';
import { useState, FormEvent } from 'react';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface LinkWithIconProps {
  readonly children: string,
  readonly Icon: OverridableComponent<any>
}

function LinkWithIcon(props: LinkWithIconProps) {
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
    >
      <props.Icon color='secondary'/>
      <Link
        color="secondary"
        variant="body1"
        sx={{
          width: 'calc(100% - 24px)',
          paddingLeft: 1
        }}
      >
        {props.children}
      </Link>
    </Grid>
  )
}

export default function ContactsPage() {
  const [loading, setLoading] = useState<boolean>(false)
  const theme = useTheme()
  const waves = useBackgroundWaves(theme.palette.secondary.light)

  const form = useForm({
    company: {
      value: "",
      validators: [Validators.required],
    },
    phoneNumber: {
      value: "",
      validators: [Validators.isATelephoneNumber],
    },
    email: {
      value: "",
      validators: [Validators.required, Validators.isAnEmail],
    },
    message: {
      value: "",
      validators: [Validators.required],
    },
  });

  const handleSubmit = (e: FormEvent) => {
    //setSuccess(false)
    e.preventDefault();

    if(!form.isFormValid())
      return

    setLoading(true)
    api.contactUs
      .process(form.getValues())
      //.then(() => setSuccess(true))
      .finally(() => setLoading(false))
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        marginTop: { xs: 16, md: 24 },
        marginBottom: { xs: 4, md: 0 },
      }}
    >
      <Typography
        variant="h3"
        fontWeight="700"
        >
        Contattaci
      </Typography>
      <Grid
        container
        component={Paper}
        direction={{xs: 'column', md: 'row'}}
        alignItems={{xs: "center", md: 'flex-start'}}
        justifyContent="center"
        sx={{
          position: 'relative',
          padding: 4,
          marginTop: 4,
          maxWidth: 1000,
          overflow: 'hidden',
          "& > *": { zIndex: 1 },
          "&::after": {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0.4,
            top: 0,
            zIndex: 0,
            transform: {
              xs: 'rotate(-180deg) translate(0%, -48%)',
              md: 'rotate(-157deg) translate(4%, -49%)'
            },
            ...waves,
          }
        }}
      >
        <Stack
          spacing={3}
          width={{xs: "100%", md: "60%"}}
          height="150px"
          direction={{xs: "column-reverse", md: 'column'}}
          justifyContent="space-between"
          sx={{
            marginBottom: {xs: 4, md: 0},
            height: '100%'
          }}
        >
          <Typography
            variant="body2"
            sx={{maxWidth: "500px"}}
            textAlign={{xs: 'center', md: 'left'}}
          >
            Se hai bisogno di maggiori informazioni ti invitiamo a compilare il seguente modulo. Riceverai una risposta il prima possibile.
          </Typography>
          <Stack
            direction="column"
            spacing={1}
          >
            <LinkWithIcon
              Icon={PlaceRoundedIcon}
            >
              Via Gian Luigi Lazzari 18, Quarto Inferiore (BO)
            </LinkWithIcon>
            <LinkWithIcon
              Icon={PhoneRoundedIcon}
            >
              051 800 960
            </LinkWithIcon>
            <LinkWithIcon
              Icon={MailRoundedIcon}
            >
              info@simmimballaggi.com
            </LinkWithIcon>
          </Stack>
        </Stack>
        <Grid
          container
          width={{xs: "100%", md: "40%"}}
          maxWidth={550}
          direction="column"
        >
          <FormGroup
            form={form}
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              "& > *": { marginBlock: theme => theme.spacing(1, '!important') }
            }}
          >
            <TextField
              name="company"
              required
              fullWidth
              label="Azienda"
              variant="outlined"
              InputProps={{ startAdornment: <BusinessRoundedIcon/>}}
            />
            <TextField
              name="phoneNumber"
              fullWidth
              label="Telefono"
              variant="outlined"
              InputProps={{ startAdornment: <PhoneRoundedIcon/>}}
            />
            <TextField
              name="email"
              required
              label="Mail"
              variant="outlined"
              InputProps={{ startAdornment: <MailRoundedIcon/>}}
            />
            <TextField
              name="message"
              fullWidth
              required
              label="Scrivi qualcosa..."
              variant="outlined"
              multiline
              rows={5}
            />
            <Button
              color="primary"
              type="submit"
              variant="contained"
              disabled={loading}
            >
              Invia
            </Button>
          </FormGroup>
        </Grid>
      </Grid>
    </Grid>
  )
}
