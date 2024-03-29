import EmojiObjectsRounded from '@mui/icons-material/EmojiObjectsRounded';
import ReportProblemRounded from '@mui/icons-material/ReportProblemRounded';

import { useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import Page from '@wui/layout/Page';
import PageSettings from '@wui/layout/PageSettings';
import Section from '@wui/layout/Section';
import Sections from '@wui/layout/Sections';
import useLanguage from '@wui/wrappers/useLanguage';
import dynamic from 'next/dynamic';
import { IconCard } from '../../components/cards/IconCard';
import { CaseStudyTopSection } from '../../components/sections/CaseStudyTopSection';


const GetAQuote = dynamic(() => import("../../components/sections/GetAQuote"), { ssr: true })

export default function KaireCaseStudy() {
  const { t, tHtml } = useLanguage();
  const theme = useTheme();

  return (
    <Page>
      <PageSettings pageTranslationName="kaire" />
      <Sections>
        <CaseStudyTopSection
          mainTitle='Kaire Automation'
          alt="kaire"
          direction="row"
          label={t('case-study')}
          title={t('kaire-study-title')}
          description={tHtml('kaire-study-description')}
          src="/assets/images/kaire2.webp"
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
        <GetAQuote />
      </Sections>
    </Page>
  );
}
