import { Button, Link, Stack, Typography } from '@mui/material';
import Page from '@wui/layout/Page';
import Section from '@wui/layout/Section';
import Sections from '@wui/layout/Sections';

export default function MessageError() {

  return (
    <Page centered>
      <Sections>
        <Section>
          <Stack direction="column" alignItems="center" spacing={2}>
            <Typography variant="h2">Errore</Typography>
            <Typography>
              C'è stato un errore con l'invio della richiesta.
            </Typography>
            <Button
              href="https://webion.it" 
              variant="contained"
              color="primary"
              size="large"
            >
              Vai a webion.it
            </Button>
          </Stack>
        </Section>
      </Sections>
    </Page>
  );
}
