import { EmojiObjectsRounded, ReportProblemRounded } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Page, Section, Sections, useLanguage } from '@whub/wui';
import { IconCard } from '../../components/IconCard';
import { ImageAndDescription } from '../../components/ImageAndDescription';
import { GetAQuoteSection } from '../../components/sections/GetAQuote';

export default function SimmCaseStudy() {
  const { t } = useLanguage();

  return (
    <Page>
      <Sections>
        <Section>
          <Stack direction="column" spacing={4} sx={{ width: '100%', marginTop: 4 }}>
            <Typography variant="h2" textAlign="center">
              Kaire Automation
            </Typography>
            <ImageAndDescription
              direction="row"
              label={t('case-study')}
              title={t('kaire-study-title')}
              description={t('kaire-study-description', true)}
              src="/assets/images/projects/simm.png"
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
              title={t('kaire-problem-title')}
              paragraph={t('kaire-problem-description', true)}
            />
            <IconCard
              icon={<EmojiObjectsRounded fontSize="large" />}
              title={t('kaire-solution-title')}
              paragraph={t('kaire-solution-description', true)}
            />
          </Stack>
        </Section>
        <GetAQuoteSection />
      </Sections>
    </Page>
  );
}
