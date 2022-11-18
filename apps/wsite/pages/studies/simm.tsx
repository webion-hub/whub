import {
  EmojiObjectsRounded,
  ReportProblemRounded
} from '@mui/icons-material';
import { Button, Typography, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import { Page, Section, Sections, useLanguage } from '@whub/wui';
import { IconCard } from '../../components/cards/IconCard';
import { ImageAndDescription } from '../../components/ImageAndDescription';
import { GetAQuoteSection } from '../../components/sections/GetAQuote';

export default function SimmCaseStudy() {
  const { t, tHtml } = useLanguage();
  const theme = useTheme();

  return (
    <Page>
      <Sections>
        <Section>
          <Stack
            direction="column"
            spacing={4}
            sx={{
              width: '100%',
              marginTop: 4,
              marginInline: 1
            }}
          >
            <Typography variant="h2" textAlign="center">
              SIMM Imballaggi.
            </Typography>
            <ImageAndDescription
              alt="simm"
              direction="row"
              label={t('case-study')}
              title={t('simm-study-title')}
              description={tHtml('simm-study-description')}
              src="/assets/images/projects/simm.png"
              actionComponent={
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  href="https://shop.simmimballaggi.com/"
                  target="_blank"
                >
                  {t('see-website')}
                </Button>
              }
            />
          </Stack>
        </Section>
        <Section>
          <Stack
            direction="row"
            flexWrap="wrap"
            sx={{
              '& > *': {
                margin: 1,
                minWidth: 'auto !important',
                width: {
                  xs: `calc(100% - ${theme.spacing(2)})`,
                  md: `calc(50% - ${theme.spacing(2)})`
                },
              },
            }}
          >
            <IconCard
              icon={<ReportProblemRounded fontSize="large" />}
              title={t('simm-problem-title')}
              paragraph={t('simm-problem-description')}
            />
            <IconCard
              icon={<EmojiObjectsRounded fontSize="large" />}
              title={t('simm-solution-title')}
              paragraph={t('simm-solution-description')}
            />
          </Stack>
        </Section>
        <GetAQuoteSection />
      </Sections>
    </Page>
  );
}
