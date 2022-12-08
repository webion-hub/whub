import { EmojiObjectsRounded, ReportProblemRounded } from '@mui/icons-material';
import { Typography, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import { Page, Section, Sections, useLanguage } from '@whub/wui';
import PageSettings from 'libs/wui/src/components/page_components/PageSettings';
import { IconCard } from '../../components/cards/IconCard';
import { ImageAndDescription } from '../../components/ImageAndDescription';
import { GetAQuoteSection } from '../../components/sections/GetAQuote';

export default function KaireCaseStudy() {
  const { t, tHtml } = useLanguage();
  const theme = useTheme();

  return (
    <Page>
      <PageSettings pageTranslationName="kaire" />
      <Sections>
        <Section>
          <Stack
            direction="column"
            spacing={4}
            sx={{
              width: '100%',
              marginTop: 4,
              marginInline: 1,
            }}
          >
            <Typography variant="h2" textAlign="center">
              Kaire Automation
            </Typography>
            <ImageAndDescription
              alt="kaire"
              direction="row"
              label={t('case-study')}
              title={t('kaire-study-title')}
              description={tHtml('kaire-study-description')}
              src="/assets/images/kaire2.webp"
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
                  md: `calc(50% - ${theme.spacing(2)})`,
                },
              },
            }}
          >
            <IconCard
              icon={<ReportProblemRounded fontSize="large" />}
              title={t('kaire-problem-title')}
              paragraph={tHtml('kaire-problem-description')}
            />
            <IconCard
              icon={<EmojiObjectsRounded fontSize="large" />}
              title={t('kaire-solution-title')}
              paragraph={tHtml('kaire-solution-description')}
            />
          </Stack>
        </Section>
        <GetAQuoteSection />
      </Sections>
    </Page>
  );
}
