import { Button, Stack, Typography } from '@mui/material';
import { useNextNavigator } from '@wui/core';
import Page from '@wui/layout/Page';
import Section from '@wui/layout/Section';
import Sections from '@wui/layout/Sections';
import { useLanguage } from '@wui/wrappers';

export default function MessageSent() {
  const { t } = useLanguage();
  const { clickNavigate } = useNextNavigator();

  return (
    <Page centered>
      <Sections>
        <Section>
          <Stack direction="column" alignItems="center" spacing={2}>
            <Typography variant="h2">{t('message-sent')}</Typography>
            <Typography>{t('we-will-answer-in-48h')}</Typography>
            <Button
              href="/"
              onClick={clickNavigate('/')}
              variant="contained"
              color="primary"
              size="large"
            >
              {t('go-to-home')}
            </Button>
          </Stack>
        </Section>
      </Sections>
    </Page>
  );
}
