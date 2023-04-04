import { Box, Button, Divider, Link, Paper, Stack, Typography } from '@mui/material';
import { NextImg } from '@wui/components';
import { useNextNavigator } from '@wui/core';
import Page from '@wui/layout/Page';
import Section from '@wui/layout/Section';
import Sections from '@wui/layout/Sections';
import useLanguage from '@wui/wrappers/useLanguage';

export default function MessageError() {
  const { t } = useLanguage();
  const { clickNavigate } = useNextNavigator();

  return (
    <Page centered>
      <Sections>
        <Section>
          <Stack 
            direction="column" 
            alignItems="center" 
            spacing={2}
            sx={{ width: '100%' }}
          >
            <Paper 
              sx={{ 
                maxWidth: 600,
                margin: 2,
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <NextImg
                sx={{ display: 'block' }}
                auto={{ width: '100%', height: 'auto' }}
                sizes='600px'
                alt='webion'
                src="/assets/images/webion.png"
              />
              <Typography 
                variant="h4" 
                color="white"
                sx={{
                  textShadow: '0px 2px 3px #0000004a',
                  position: 'absolute',
                  bottom: 48,
                  width: '100%',
                  textAlign: 'center',
                  left: '50%',
                  transform: 'translateX(-50%)'
                }}
              >
                {t('error-404-gag')}
              </Typography>
            </Paper>
            <Typography variant="h2">{t('error-404')}</Typography>
            <Typography>
              {t('error-404-message')}&nbsp;
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
