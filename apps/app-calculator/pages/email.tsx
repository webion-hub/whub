import { Button, Stack, TextField } from "@mui/material";
import { useNextNavigator } from "@wui/core";
import { Card } from "../components/Card";
import { IconTitle } from "../components/IconTitle";
import { Section } from "../components/Section";

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useEmail } from "../states/useEmail";
import { FormEvent, useState } from "react";

export default function EmailPage() {
  const { clickNavigate } = useNextNavigator()
  const { email, set, isAnEmail } = useEmail()
  const [error, setError] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(!isAnEmail())
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
          variant="outlined"
          startIcon={<ArrowBackRoundedIcon/>}
          onClick={clickNavigate('/')}
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
            <IconTitle
              Icon={EmailRoundedIcon}
              text="Ultimo step"
            />
            <TextField
              name="email"
              variant="outlined"
              color="primary"
              label="Email"
              error={error}
              value={email}
              onChange={e => handleChange(e.target.value)}
            />
          </Stack>
        </Card>
      </Section>
      <Section>
        <Stack
          alignItems="flex-end"
          sx={{ width: '100%' }}
        >
          <Button
            type="submit"
            variant='contained'
            size='large'
            endIcon={<SendRoundedIcon/>}
          >
            Completa
          </Button>
        </Stack>
      </Section>
    </form>
  );
}