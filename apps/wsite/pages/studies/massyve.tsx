import { EmojiObjectsRounded, ReportProblemRounded } from '@mui/icons-material';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import { NextImg, Page, Section, Sections, useLanguage } from '@whub/wui';
import { IconCard } from '../../components/cards/IconCard';
import { ImageAndDescription } from '../../components/ImageAndDescription';
import { GetAQuoteSection } from '../../components/sections/GetAQuote';

export default function MassyveCaseStudy() {
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
              marginInline: 1,
            }}
          >
            <Typography variant="h2" textAlign="center">
              Massyve
            </Typography>
            <ImageAndDescription
              direction="row"
              alt="massyve"
              label={t('case-study')}
              title={t('massyve-study-title')}
              description={tHtml('massyve-study-description')}
              src="/assets/images/projects/massyve.webp"
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
          </Stack>
        </Section>
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
            >
              {t('massyve-result-description-1')}
              <br />
              <Box maxWidth={700} position="relative">
                <NextImg
                  fill
                  alt="results before"
                  src="/assets/images/massyve-results-before.png"
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
                  src="/assets/images/massyve-results-after.png"
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
        <GetAQuoteSection />
      </Sections>
    </Page>
  );
}
