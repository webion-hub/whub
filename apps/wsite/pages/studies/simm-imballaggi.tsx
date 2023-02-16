import EmojiObjectsRounded from '@mui/icons-material/EmojiObjectsRounded';
import ReportProblemRounded from '@mui/icons-material/ReportProblemRounded';

import { Button, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import Page from '@webion/ui-layout/Page';
import PageSettings from '@webion/ui-layout/PageSettings';
import Section from '@webion/ui-layout/Section';
import Sections from '@webion/ui-layout/Sections';
import useLanguage from '@webion/ui-wrappers/useLanguage';
import dynamic from 'next/dynamic';
import { IconCard } from '../../components/cards/IconCard';
import { CaseStudyTopSection } from '../../components/sections/CaseStudyTopSection';

const GetAQuote = dynamic(() => import("../../components/sections/GetAQuote"), { ssr: true })

export default function SimmCaseStudy() {
  const { t, tHtml } = useLanguage();
  const theme = useTheme();

  return (
    <Page>
      <PageSettings pageTranslationName="simm" />
      <Sections>
        <CaseStudyTopSection
          mainTitle='SIMM Imballaggi'
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
        <GetAQuote />
      </Sections>
    </Page>
  );
}
