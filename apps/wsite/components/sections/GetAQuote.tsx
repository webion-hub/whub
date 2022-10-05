import { AccountTreeRounded, CallRounded } from '@mui/icons-material';
import { Button, Stack, Typography, useTheme } from '@mui/material';
import {
  MaybeShow,
  Section,
  useLanguage, useNextNavigator
} from '@whub/wui';

export function GetAQuote({
  hideSecondaryBtn,
}: {
  hideSecondaryBtn?: boolean;
}) {
  const { t } = useLanguage();
  const { clickNavigate } = useNextNavigator();

  return (
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
        {t('quote-title', true)}
      </Typography>
      <Typography variant="body1" textAlign="center" sx={{ color: '#fff' }}>
        {t('quote-desc')}
      </Typography>
      <Stack
        direction="row"
        justifyContent="center"
        flexWrap="wrap"
        sx={{
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
        <MaybeShow show={!hideSecondaryBtn}>
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
  );
}

export function GetAQuoteSection({
  hideSecondaryBtn,
}: {
  hideSecondaryBtn?: boolean;
}) {
  const theme = useTheme();

  return (
    <Section
      id="quote"
      ignoreSection
      showBackground
      background={theme.palette.primary.dark}
    >
      <GetAQuote hideSecondaryBtn={hideSecondaryBtn} />
    </Section>
  );
}
