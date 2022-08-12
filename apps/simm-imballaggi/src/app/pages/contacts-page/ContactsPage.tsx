import { Button, Grid, TextField, Typography } from '@mui/material'
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import { api } from '@whub/api';
import { FormGroup, useForm, Validators } from '@whub/wui';
import { t } from 'i18next';
import { useState, FormEvent } from 'react';

export default function ContactsPage() {
  const [loading, setLoading] = useState<boolean>(false)

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
      justifyContent="center"
      sx={{marginTop: 12}}
    >
      <Typography 
        variant="h3"
        fontWeight="700"
        >
        Contattaci
      </Typography>
      <Grid
        container
        justifyContent="center"
        sx={{ marginTop: 4 }}
      >
        <Grid
          container
          width="auto"
          height="150px"
          direction="column"
          justifyContent="space-between"
          sx={{
            paddingInline: 6,
            marginRight: {md: 2}, 
            marginBottom: {xs: 4, md: 0}, 
          }}
        >
          <Typography 
            variant="body2"
            sx={{maxWidth: "500px"}}
          >
            Se hai bisogno di maggiori informazioni ti invitiamo a compilare il seguente modulo. Riceverai una risposta il prima possibile.
          </Typography>
          <Grid
            container
            alignItems="center"
          >
            <PlaceRoundedIcon color='primary' sx={{marginRight: 2}}/>
            <Typography variant="body1">
              Via Gian Luigi Lazzari 18, Quarto Inferiore (BO)
            </Typography>
          </Grid>
          <Grid
            container
            alignItems="center"
          >
            <PhoneRoundedIcon color='primary' sx={{marginRight: 2}}/>
            <Typography variant="body1">
              051 800 960
            </Typography>
          </Grid>
          <Grid
            container
            alignItems="center"
          >
            <MailRoundedIcon color='primary' sx={{marginRight: 2}}/>
            <Typography variant="body1">
              info@simmimballaggi.com
            </Typography>
          </Grid>
        </Grid>
        <Grid 
          container
          maxWidth="400px"
          direction="column"
        >
          <FormGroup
            form={form}
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField 
              name="company"
              required
              size="small" 
              label="Azienda" 
              variant="outlined" 
              sx={{marginBlock: 1}} 
              InputProps={{ startAdornment: <BusinessRoundedIcon/>}}
              />
            <TextField
              size="small"
              name="phoneNumber"
              label="Telefono"
              variant="outlined" 
              sx={{marginBlock: 1}} 
              InputProps={{ startAdornment: <PhoneRoundedIcon/>}}
              />
            <TextField
              name="email"
              required
              size="small"
              label="Mail"
              variant="outlined" 
              sx={{marginTop: 1}} 
              InputProps={{ startAdornment: <MailRoundedIcon/>}}
            />
            <TextField
              name="message"
              required
              size="small"
              label="Scrivi qualcosa..."
              variant="outlined"
              multiline
              rows={3}
              sx={{marginBlock: 2}} 
            />
            <Button
              color="primary"
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{marginBottom: 2}} 
            >
              Invia
            </Button>
          </FormGroup>
        </Grid>
      </Grid>
    </Grid>
  )
}