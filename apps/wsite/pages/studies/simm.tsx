import {
  BubbleChartRounded,
  EmojiObjectsRounded,
  ReportProblemRounded,
} from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Img, Page, Section, Sections, useLanguage } from '@whub/wui';
import { GetAQuoteSection } from 'apps/wsite/components/sections/GetAQuote';
import { IconCard } from '../../components/IconCard';
import { ImageAndDescription } from '../../components/ImageAndDescription';

export default function SimmCaseStudy() {
  const { t } = useLanguage();

  return (
    <Page>
      <Sections>
        <Section>
          <Stack direction="column" spacing={4} sx={{ width: '100%' }}>
            <Typography variant="h2" textAlign="center">
              SIMM Imballaggi.
            </Typography>
            <ImageAndDescription
              direction="row"
              label={t('case-study')}
              title={t('simm-study-title')}
              description={t('simm-study-description')}
              src="https://webion.it/images/industry-4-p-500.webp"
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
            sx={{
              '& > *': {
                margin: 1,
                width: (theme) => `calc(50% - ${theme.spacing(2)})`,
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
