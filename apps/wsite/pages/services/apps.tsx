import {
  BubbleChartRounded,
  CallRounded,
  DevicesOtherRounded,
  EditRounded,
  HelpRounded,
  MobileFriendlyRounded,
  SecurityRounded,
  StoreRounded,
} from '@mui/icons-material';
import { alpha, Button, Link, Stack } from '@mui/material';
import {
  Page,
  Section,
  Sections,
  useLanguage,
  useNextNavigator,
} from '@whub/wui';
import { GetAQuoteSection } from '../../components/sections/GetAQuote';
import { CardGroup } from '../../components/CardGroup';
import { IconCard } from '../../components/cards/IconCard';
import { ImageAndDescription } from '../../components/ImageAndDescription';
import { PageSettings } from '@whub/wui';
import { CaseStudyLink } from '../../components/CaseStudyLink';
import { netBackground } from '../../components/backgrounds/netBackground';
import { useTheme } from '@mui/material';
import { Faq } from '@whub/page-sections';

export default function Apps() {
  const { clickNavigate } = useNextNavigator();
  const { t, tHtml } = useLanguage();
  const theme = useTheme();

  return (
    <Page>
      <PageSettings pageTranslationName="app" />
      <Sections>
        <Section>
          <ImageAndDescription
            direction="row"
            label={t('apps')}
            title={t('app-page-title')}
            description={tHtml('app-page-description')}
            src="/assets/images/services/apps.jpg"
            alt="apps"
            actionComponent={
              <Button
                size="large"
                variant="contained"
                color="primary"
                startIcon={<CallRounded />}
                href="/contact-us"
                onClick={clickNavigate('/contact-us')}
              >
                {t('contact-us')}
              </Button>
            }
          />
        </Section>
        <Section>
          <CardGroup label={t('app-features')} title={t('app-features-title')}>
            <IconCard
              icon={<BubbleChartRounded fontSize="large" />}
              title={t('app-features-1-title')}
              paragraph={t('app-features-1-description')}
            />
            <IconCard
              icon={<EditRounded fontSize="large" />}
              title={t('app-features-2-title')}
              paragraph={t('app-features-2-description')}
            />
            <IconCard
              icon={<MobileFriendlyRounded fontSize="large" />}
              title={t('app-features-3-title')}
              paragraph={t('app-features-3-description')}
            />
            <IconCard
              icon={<StoreRounded fontSize="large" />}
              title={t('app-features-4-title')}
              paragraph={t('app-features-4-description')}
            />
            <IconCard
              icon={<SecurityRounded fontSize="large" />}
              title={t('app-features-5-title')}
              paragraph={t('app-features-5-description')}
            />
            <IconCard
              icon={<DevicesOtherRounded fontSize="large" />}
              title={t('app-features-6-title')}
              paragraph={t('app-features-6-description')}
            />
          </CardGroup>
        </Section>
        <Section>
          <CaseStudyLink
            title={t('example')}
            caseStudyTitle={t('bocconi-title')}
            caseStudyDescription={t('bocconi')}
            href="/studies/bocconi"
            src="/assets/images/projects/bocconi/bocconi.png"
          />
        </Section>
        <Section
          id="faq"
          showBackground
          sx={{
            paddingTop: 0,
            paddingInline: 2,
          }}
          background={netBackground(theme)}
          backgroundSx={{
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'top',
            opacity: theme.palette.mode === 'dark' ? 0.15 : 0.05,
          }}
        >
          <Faq
            bottomLabel={
              <>
                {t('forget-anything')}&nbsp;
                <Link href="/contact-us" onClick={clickNavigate('/contact-us')}>
                  {t('send-a-message')}
                </Link>
                &nbsp;{t('answer-in-48h')}
              </>
            }
            questions={[
              {
                question: t('app-faq-q1'),
                answer: tHtml('app-faq-a1'),
              },
              {
                question: t('app-faq-q2'),
                answer: tHtml('app-faq-a2'),
              },
              {
                question: t('app-faq-q3'),
                answer: tHtml('app-faq-a3'),
              },
              {
                question: t('app-faq-q4'),
                answer: tHtml('app-faq-a4'),
              },
              {
                question: t('app-faq-q5'),
                answer: tHtml('app-faq-a5'),
              },
              {
                question: t('app-faq-q6'),
                answer: tHtml('app-faq-a6'),
              },
            ]}
            title={t('faq')}
            sx={{
              marginInline: 2,
              marginTop: 10,
              marginBottom: 8,
            }}
            questionBoxSx={{
              marginTop: (theme) => theme.spacing(12, '!important'),
            }}
            icon={
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  padding: 2,
                  borderRadius: '100%',
                  background: (theme) =>
                    alpha(theme.palette.primary.light, 0.2),
                }}
              >
                <HelpRounded
                  fontSize="large"
                  sx={{
                    color: (theme) => theme.palette.primary.light,
                  }}
                />
              </Stack>
            }
          />
        </Section>
        <GetAQuoteSection />
      </Sections>
    </Page>
  );
}
