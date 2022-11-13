import { EmojiObjectsRounded, ReportProblemRounded } from '@mui/icons-material';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Page, Section, Sections, useLanguage } from '@whub/wui';
import { IconCard } from '../../components/IconCard';
import { ImageAndDescription } from '../../components/ImageAndDescription';
import { GetAQuoteSection } from '../../components/sections/GetAQuote';

export default function MassyveCaseStudy() {
  const { t, tHtml } = useLanguage();

  return (
    <Page>
      <Sections>
        <Section>
          <Stack
            direction="column"
            spacing={4}
            sx={{ width: '100%', marginTop: 4 }}
          >
            <Typography variant="h2" textAlign="center">
              Massyve
            </Typography>
            <ImageAndDescription
              direction="row"
              label={t('case-study')}
              title={t('massyve-study-title')}
              description={tHtml('massyve-study-description')}
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
          <Stack spacing={2}>
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
              paragraph={t('massyve-result-description-1')}
            />
          </Stack>
        </Section>
        <GetAQuoteSection />
      </Sections>
    </Page>
  );
}
