import {
  CallRounded,
  HelpRounded,
  InsightsRounded,
  LibraryBooksRounded,
  LinkRounded,
} from '@mui/icons-material';
import { alpha, Button, Link, Stack, useTheme } from '@mui/material';
import {
  Page,
  Section,
  Sections,
  useLanguage,
  useNextNavigator,
} from '@whub/wui';
import { CaseStudyLink } from '../../components/CaseStudyLink';
import { CardGroup } from '../../components/CardGroup';
import { IconCard } from '../../components/cards/IconCard';
import { ImageAndDescription } from '../../components/ImageAndDescription';
import { GetAQuoteSection } from '../../components/sections/GetAQuote';
import { PageSettings } from '@whub/wui';
import { netBackground } from '../../components/backgrounds/netBackground';
import { Faq } from '@whub/page-sections';

export default function Industry() {
  const { clickNavigate } = useNextNavigator();
  const { t, tHtml } = useLanguage();
  const theme = useTheme();

  return (
    <Page>
      <PageSettings pageTranslationName="industry" />
      <Sections>
        <Section>
          <ImageAndDescription
            direction="row"
            label={t('industry')}
            title={t('industry-page-title')}
            description={tHtml('industry-page-description')}
            src="/assets/images/services/industry.jpg"
            alt="industry"
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
          <CardGroup
            label={t('solutions')}
            title={t('industry-solutions-title')}
          >
            <IconCard
              icon={<LinkRounded fontSize="large" />}
              title={t('industry-features-1-title')}
              paragraph={t('industry-features-1-description')}
            />
            <IconCard
              icon={<LibraryBooksRounded fontSize="large" />}
              title={t('industry-features-2-title')}
              paragraph={t('industry-features-2-description')}
            />
            <IconCard
              icon={<InsightsRounded fontSize="large" />}
              title={t('industry-features-3-title')}
              paragraph={t('industry-features-3-description')}
            />
          </CardGroup>
        </Section>
        <Section>
          <CaseStudyLink
            title={t('collaboration-title')}
            caseStudyTitle={t('kaire-title')}
            caseStudyDescription={t('kaire-short-description')}
            href="/studies/kaire"
            src="/assets/images/kaire2.webp"
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
                question: t('industry-faq-q1'),
                answer: tHtml('industry-faq-a1'),
              },
              {
                question: t('industry-faq-q2'),
                answer: tHtml('industry-faq-a2'),
              },
              {
                question: t('industry-faq-q3'),
                answer: tHtml('industry-faq-a3'),
              },
              {
                question: t('industry-faq-q4'),
                answer: tHtml('industry-faq-a4'),
              },
              {
                question: t('industry-faq-q5'),
                answer: tHtml('industry-faq-a5'),
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
