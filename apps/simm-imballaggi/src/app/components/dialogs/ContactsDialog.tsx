import { Alert, Dialog, DialogContent, Grid, Link, Snackbar, Stack, TextField, Typography, useTheme } from '@mui/material'
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import { DialogBase, DialogTitleCross, Form, FormGroup, InputValidator, useBackgroundWaves, Validators } from '@whub/wui';
import { MouseEvent, useState } from 'react';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { LoadingButton } from '@mui/lab';
import { useContactUsApi } from '@whub/apis-react';

interface LinkWithIconProps {
  readonly children: string,
  readonly href?: string,
  readonly target?: string,
  readonly onClick?: (e: any) => void,
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
        href={props.href}
        target={props.target}
        onClick={props.onClick}
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

export default function ContactsDialog(props: DialogBase) {
  const [success, setSuccess] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const contactUsApi = useContactUsApi()
  const theme = useTheme()
  const waves = useBackgroundWaves(theme.palette.secondary.light)

  const handleSubmit = (form: Form) => {
    setSuccess(false)

    if(!form.isFormValid())
      return

    form.disable(true)
    setLoading(true)
    contactUsApi.contactUs
      .process(form.getValues())
      .then(() => setSuccess(true))
      .finally(() => setLoading(false))
      .finally(() => form.disable(false))
    };

  return (
    <Dialog
      open={props.open}
      maxWidth="md"
      onClose={props.onClose}
    >
      <DialogTitleCross
        onClose={props.onClose}
      >
        Contattaci
      </DialogTitleCross>
      <DialogContent
        sx={{
          position: 'relative',
          overflow: 'hidden',
          "& > *": { zIndex: 1 },
          "&::before": {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0.4,
            top: 0,
            left: 0,
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
          sx={{ marginTop: 1 }}
          spacing={4}
          direction={{xs: 'column', md: 'row'}}
          alignItems={{xs: "center", md: 'flex-start'}}
          justifyContent="center"
        >
          <Stack
            spacing={3}
            width={{xs: "100%", md: "50%"}}
            height="150px"
            direction={{xs: "column-reverse", md: 'column'}}
            justifyContent="space-between"
            sx={{
              marginBottom: {xs: 4, md: 0},
              height: '100%',
              zIndex: 1,
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
                target="_blank"
                href="https://www.google.com/maps?ll=44.535115,11.413146&z=16&t=m&hl=it&gl=IT&mapclient=embed&q=Via+Gian+Luigi+Lazzari,+18+40057+Quarto+Inferiore+BO"
              >
                Via Gian Luigi Lazzari 18, Quarto Inferiore (BO)
              </LinkWithIcon>
              <LinkWithIcon
                Icon={PhoneRoundedIcon}
                href="tel:051 800 960"
              >
                051 800 960
              </LinkWithIcon>
              <LinkWithIcon
                Icon={MailRoundedIcon}
                href="mailto:info@simmimballaggi.com"
              >
                info@simmimballaggi.com
              </LinkWithIcon>
            </Stack>
          </Stack>
          <FormGroup
            onSubmit={handleSubmit}
          >
            <Stack
              direction="column"
              spacing={1}
            >

              <Stack
                justifyContent="space-between"
                direction="row"
                spacing={1}
              >
                <InputValidator
                  name='name'
                  value=''
                  validators={[Validators.required]}
                >
                  <TextField
                    size="small"
                    required
                    label="Nome"
                  />
                </InputValidator>
                <InputValidator
                  name='surname'
                  value=''
                  validators={[Validators.required]}
                >
                  <TextField
                    size="small"
                    required
                    label="Cognome"
                  />
                </InputValidator>
              </Stack>
              <InputValidator
                name="company"
                value=''
              >
                <TextField
                  size="small"
                  fullWidth
                  label="Azienda"
                  variant="outlined"
                  InputProps={{ endAdornment: <BusinessRoundedIcon/>}}
                />
              </InputValidator>
              <InputValidator
                name="phoneNumber"
                value=''
                validators={[Validators.isATelephoneNumber]}
              >
                <TextField
                  size="small"
                  fullWidth
                  label="Telefono"
                  variant="outlined"
                  InputProps={{ endAdornment: <PhoneRoundedIcon/>}}
                />
              </InputValidator>
              <InputValidator
                name="email"
                value=''
                validators={[Validators.required, Validators.isAnEmail]}
              >
                <TextField
                  size="small"
                  name="email"
                  required
                  label="Mail"
                  variant="outlined"
                  InputProps={{ endAdornment: <MailRoundedIcon/>}}
                />
              </InputValidator>
              <InputValidator
                name="message"
                value=''
                validators={[Validators.required]}
              >
                <TextField
                  size="small"
                  fullWidth
                  required
                  label="Scrivi qualcosa..."
                  variant="outlined"
                  multiline
                  rows={5}
                />
              </InputValidator>
              <LoadingButton
                color="primary"
                type="submit"
                variant="contained"
                loading={loading}
              >
                Invia
              </LoadingButton>
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
            </Stack>
          </FormGroup>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
