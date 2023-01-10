import { Button, Link, Stack, Typography } from '@mui/material';
import {
  Page,
  Section,
  Sections,
  useLanguage,
  useNextNavigator,
} from '@whub/wui';
import { WebionRepository } from '../../lib/WebionRepositiory';

export default function MessageError() {
  const { t } = useLanguage();
  const { clickNavigate } = useNextNavigator();

  return (
    <Page centered>
      <Sections>
        <Section>
          <Stack direction="column" alignItems="center" spacing={2}>
            <Typography variant="h2">{t('message-error')}</Typography>
            <Typography>
              {t('message-error-subtitle')}&nbsp;
              <Link href={WebionRepository.HREF_EMAIL}>
                {WebionRepository.EMAIL}
              </Link>
            </Typography>
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
