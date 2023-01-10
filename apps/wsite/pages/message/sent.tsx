import { Button, Stack, Typography } from '@mui/material';
import {
  Page,
  Section,
  Sections,
  useLanguage,
  useNextNavigator,
} from '@whub/wui';

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
