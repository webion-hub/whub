import { Button, Stack, Typography } from '@mui/material';
import Page from '@wui/layout/Page';
import Section from '@wui/layout/Section';
import Sections from '@wui/layout/Sections';

export default function MessageSent() {
  return (
    <Page centered>
      <Sections>
        <Section>
          <Stack direction="column" alignItems="center" spacing={2}>
            <Typography variant="h2">Grazie,</Typography>
            <Typography>A breve riceverai il preventivo.</Typography>
            <Button
              href="https://webion.it"
              variant="contained"
              color="primary"
              size="large"
            >
              Scopri Webion
            </Button>
          </Stack>
        </Section>
      </Sections>
    </Page>
  );
}
