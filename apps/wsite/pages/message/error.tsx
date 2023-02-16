import { Button, Link, Stack, Typography } from '@mui/material';
import { useNextNavigator } from '@webion/ui-core';
import Page from '@webion/ui-layout/Page';
import Section from '@webion/ui-layout/Section';
import Sections from '@webion/ui-layout/Sections';
import useLanguage from '@webion/ui-wrappers/useLanguage';
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
