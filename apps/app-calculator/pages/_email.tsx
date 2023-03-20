import { LoadingButton } from '@mui/lab';
import { Button, Checkbox, FormControlLabel, Link, Stack, TextField, Typography } from "@mui/material";
import { useContactUs } from '@wapi-ui/contactus';
import { Card } from "../components/Card";
import { IconTitle } from "../components/IconTitle";
import { Section } from "../components/Section";

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { FormEvent, useState } from "react";
import { useEmail } from "../states/useEmail";
import { usePages } from "../states/usePages";
import { Feature, features, usePreview } from "../states/usePreview";
import { useNextNavigator } from '@wui/core';

export default function EmailPage() {
  const contactUsApi = useContactUs();
  const { email, set, isAnEmail } = useEmail()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [privacyChecked, setPrivacyChecked] = useState(true)
  const state = usePreview()
  const { navigate } = useNextNavigator()
  const { set: setPage } = usePages()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!privacyChecked)
      return

    if(!isAnEmail()) {
      setError(true)
      return
    }

    const msg = features
      .map(f => state?.[f] as Feature)
      .filter(f => !!f)
      .map(f => `Description: ${f.description} - Prezzo base: ${f.basePrice}€ - Prezzo per pagina: ${f.pricePerPage ?? 0}€`)
      .join('\n')
      + `\nPrezzo finale: ${state.getFinalPrice()}€`

    setLoading(true)
    contactUsApi
      .contactUs
      .process({
        name: '',
        email: email,
        msg: msg,
      })
      .then(() => navigate('/message/sent'))
      .catch(() => navigate('/message/error'))
      .finally(() => setLoading(false))
  }

  const handleChange = (email: string) => {
    set(email)
    setError(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      <Section sx={{ alignItems: 'flex-start' }}>
        <Button
          color="inherit"
          variant="outlined"
          startIcon={<ArrowBackRoundedIcon/>}
          onClick={() => setPage('form')}
        >
          Torna indietro
        </Button>
      </Section>
      <Section id="email">
        <Card>
          <Stack
            direction="column"
            spacing={4}
          >
            <Stack direction="column">
              <IconTitle
                Icon={EmailRoundedIcon}
                text="Email"
              />
              <Typography color="textSecondary">
                Inserisci la tua email per ricevere un report gratuito!
              </Typography>
            </Stack>

            <Stack>
              <TextField
                name="email"
                variant="outlined"
                color="primary"
                label="Email"
                error={error}
                value={email}
                onChange={e => handleChange(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox onChange={() => setPrivacyChecked(!privacyChecked)}/>}
                checked={privacyChecked}
                label={
                  <Typography variant="caption" color="textSecondary">
                    Ho preso visione dell'
                    <Link href="https://webion.it/policies-licenses" target="_blank">
                      Informativa sulla privacy
                    </Link>
                  </Typography>
                } 
              />
            </Stack>
          </Stack>
        </Card>
      </Section>
      <Section>
        <Stack
          alignItems="flex-end"
          sx={{ width: '100%' }}
        >
          <LoadingButton
            loading={loading}
            type="submit"
            variant='contained'
            size='large'
            disabled={!privacyChecked}
            endIcon={<SendRoundedIcon/>}
          >
            Completa
          </LoadingButton>
        </Stack>
      </Section>
    </form>
  );
}