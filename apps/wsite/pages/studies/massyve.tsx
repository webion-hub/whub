import EmojiObjectsRounded from '@mui/icons-material/EmojiObjectsRounded';
import ReportProblemRounded from '@mui/icons-material/ReportProblemRounded';

import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import { NextImg } from '@webion/ui-components';
import Page from '@webion/ui-layout/Page';
import PageSettings from '@webion/ui-layout/PageSettings';
import Section from '@webion/ui-layout/Section';
import Sections from '@webion/ui-layout/Sections';
import useLanguage from '@webion/ui-wrappers/useLanguage';
import { ImageAndDescription } from '../../components/blocks/ImageAndDescription';
import { IconCard } from '../../components/cards/IconCard';
import dynamic from 'next/dynamic';
import { CaseStudyTopSection } from '../../components/sections/CaseStudyTopSection';

const GetAQuote = dynamic(() => import("../../components/sections/GetAQuote"), { ssr: true })

export default function MassyveCaseStudy() {
  const { t, tHtml } = useLanguage();
  const theme = useTheme();

  return (
    <Page>
      <PageSettings pageTranslationName="massyve" />
      <Sections>
        <CaseStudyTopSection
          mainTitle='Massyve'
          direction="row"
          alt="massyve"
          label={t('case-study')}
          title={t('massyve-study-title')}
          description={tHtml('massyve-study-description')}
          src="/assets/images/projects/massyve/massyve.webp"
          actionComponent={
            <Button
              variant="contained"
              color="primary"
              size="large"
              href="https://massyvemusic.design/massyve-landing"
              target="_blank"
            >
              {t('see-website')}
            </Button>
          }
        />
        <Section>
          <Stack spacing={2}>
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
                title={t('massyve-problem-title')}
                paragraph={t('massyve-problem-description')}
              />
              <IconCard
                icon={<EmojiObjectsRounded fontSize="large" />}
                title={t('massyve-solution-title')}
                paragraph={tHtml('massyve-solution-description')}
              />
            </Stack>
            <IconCard
              icon={<AutoGraphRoundedIcon fontSize="large" />}
              title={t('massyve-result-title')}
              sx={{
                margin: theme => theme.spacing(1, '!important'),
                minWidth: 'auto !important'
              }}
            >
              {t('massyve-result-description-1')}
              <br />
              <Box maxWidth={700} position="relative">
                <NextImg
                  fill
                  alt="results before"
                  src="/assets/images/projects/massyve/massyve-results-before.png"
                  sx={{
                    marginBlock: 3,
                    objectFit: 'cover',
                    position: 'relative !important',
                    borderRadius: 2,
                  }}
                />
              </Box>
              <br />
              {tHtml('massyve-result-description-2')}
              <br />
              <br />
              {t('massyve-result-description-3')}
              <Box maxWidth={700} position="relative">
                <NextImg
                  fill
                  alt="results after"
                  src="/assets/images/projects/massyve/massyve-results-after.png"
                  sx={{
                    marginBlock: 3,
                    objectFit: 'cover',
                    position: 'relative !important',
                    borderRadius: 2,
                  }}
                />
              </Box>
            </IconCard>
          </Stack>
        </Section>
        <GetAQuote />
      </Sections>
    </Page>
  );
}
