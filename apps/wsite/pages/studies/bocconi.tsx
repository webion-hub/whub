import DescriptionIcon from '@mui/icons-material/Description';
import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { NextImg } from '@wui/components';
import Page from '@wui/layout/Page';
import PageSettings from '@wui/layout/PageSettings';
import Section from '@wui/layout/Section';
import Sections from '@wui/layout/Sections';
import useLanguage from '@wui/wrappers/useLanguage';
import dynamic from 'next/dynamic';
import { ImageAndDescription } from '../../components/blocks/ImageAndDescription';
import { IconCard } from '../../components/cards/IconCard';

const GetAQuote = dynamic(() => import("../../components/sections/GetAQuote"), { ssr: true })

export default function BocconiCaseStudy() {
  const { t, tHtml } = useLanguage();

  return (
    <Page>
      <PageSettings pageTranslationName="bocconi" />
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
              Bocconi Radio
            </Typography>
            <ImageAndDescription
              alt="simm"
              direction="row"
              label={t('case-study')}
              title={t('bocconi-study-title')}
              description={tHtml('bocconi-study-description')}
              src="/assets/images/projects/bocconi/bocconi.png"
              actionComponent={
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  href="https://play.google.com/store/apps/details?id=com.devpier.bocconi_radio"
                  target="_blank"
                >
                  {t('download-app')}
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
              width: '100%',
              '& > *': {
                margin: 1,
                minWidth: 'auto !important',
                width: '100%',
              },
            }}
          >
            <IconCard
              icon={<DescriptionIcon fontSize="large" />}
              title={t('bocconi-description-title')}
            >
              {tHtml('bocconi-description-description')}
              <br />
              <Stack
                direction="row"
                flexWrap="wrap"
                sx={{
                  '& > *': {
                    marginInline: 3,
                    marginBlock: 3,
                    position: 'relative !important',
                    borderRadius: 2,
                    maxHeight: '600px',
                    height: '100%',
                  },
                }}
              >
                <NextImg
                  auto={{ width: 'auto', height: 'auto' }}
                  alt="radio page"
                  src="/assets/images/projects/bocconi/radio-page.png"
                  sizes="
                    (max-width: 700px) 100vw,
                    600px
                  "
                />
                <NextImg
                  auto={{ width: 'auto', height: 'auto' }}
                  alt="blog page"
                  src="/assets/images/projects/bocconi/blog-page.png"
                  sizes="
                    (max-width: 700px) 100vw,
                    600px
                  "
                />
                <NextImg
                  auto={{ width: 'auto', height: 'auto' }}
                  alt="play store"
                  src="/assets/images/projects/bocconi/play-store.png"
                  sizes="
                    (max-width: 700px) 100vw,
                    600px
                  "
                />
              </Stack>
            </IconCard>
          </Stack>
        </Section>
        <GetAQuote />
      </Sections>
    </Page>
  );
}
