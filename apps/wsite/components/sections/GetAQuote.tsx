import AccountTreeRounded from '@mui/icons-material/AccountTreeRounded';
import CallRounded from '@mui/icons-material/CallRounded';

import { Button, Paper, Typography } from '@mui/material';
import { Stack, SxProps, Theme, useTheme } from '@mui/system';
import { MaybeShow } from '@wui/components';
import { useNextNavigator } from '@wui/core';
import Section from '@wui/layout/Section';
import { ISection } from '@wui/sections/abstractions/ISection';

import useLanguage from '@wui/wrappers/useLanguage';


interface GetAQuoteProps extends ISection {
  readonly hideSecondaryBtn?: boolean;
  readonly sx?: SxProps<Theme>;
}

export default function GetAQuote(props: GetAQuoteProps) {
  const theme = useTheme();
  const { tHtml, t } = useLanguage();
  const { clickNavigate } = useNextNavigator();

  return (
    <Section
      id={props.id}
      ignoreSection
      showBackground
      background={theme.palette.primary?.dark}
      sx={props.sx}
    >
      <Stack
        direction="column"
        alignItems="center"
        spacing={1}
        sx={{
          maxWidth: 650,
          marginBlock: 4,
          marginInline: 2,
        }}
      >
        <Typography variant="h4" textAlign="center" sx={{ color: '#fff' }}>
          {tHtml('quote-title')}
        </Typography>
        <Typography variant="body1" textAlign="center" sx={{ color: '#fff' }}>
          {t('quote-desc')}
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          flexWrap="wrap"
          component={Paper}
          sx={{
            borderRadius: 999,
            marginTop: (theme) => theme.spacing(8, '!important'),
            '& > *': {
              margin: theme => theme.spacing(1, "!important"),
            },
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<CallRounded />}
            href="/contact-us"
            onClick={clickNavigate('/contact-us')}
          >
            {t('contact-us')}
          </Button>
          <MaybeShow show={!props.hideSecondaryBtn}>
            <Button
              size="large"
              startIcon={<AccountTreeRounded />}
              href="/projects"
              color="secondary"
              variant="outlined"
              onClick={clickNavigate('/projects')}
            >
              {t('see-projects')}
            </Button>
          </MaybeShow>
        </Stack>
      </Stack>
    </Section>
  );
}
