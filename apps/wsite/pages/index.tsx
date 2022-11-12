import { HelpRounded } from '@mui/icons-material';
import { alpha, Link, Stack, useTheme } from '@mui/material';
import { ChosenBy, Faq } from '@whub/page-sections';
import {
  NextImg,
  Page,
  Section,
  Sections,
  useLanguage,
  useNextNavigator,
} from '@whub/wui';
import { useEffect } from 'react';
import { netBackground } from '../components/backgrounds/netBackground';
import { pcbBackground } from '../components/backgrounds/pcbBackground';
import { GetAQuoteSection } from '../components/sections/GetAQuote';
import { HomeWithServices } from '../components/sections/HomeWithServices';
import OurProcess from '../components/sections/OurProcess';
import Services from '../components/sections/Services';
import { WhoWeAre } from '../components/sections/WhoWeAre';

export default function Homepage() {
  const theme = useTheme();
  const { t } = useLanguage();
  const { clickNavigate } = useNextNavigator();

  useEffect(() => {
    import('react-facebook-pixel')
      .then((m) => m.default)
      .then((r) => r.track('ViewContent'));
  }, []);

  return (
    <Page sx={{ marginTop: 0, margin: 'Auto' }}>
      <Sections>
        <Section
          id="home"
          maxWidth="100vw"
          sx={{
            width: '100%',
            zIndex: 2,
            margin: 'auto',
            padding: 0,
          }}
        >
          <HomeWithServices />
        </Section>
        <Section
          id="chosen-by"
          ignoreSection
          maxWidth="100%"
          sx={{ paddingBlock: 4 }}
        >
          <ChosenBy blackAndWhite>
            <NextImg
              auto
              height="40px"
              sizes="25vw"
              alt="bocconi"
              src="/assets/images/clients/bocconi.png"
            />
            <NextImg
              auto
              height="40px"
              sizes="25vw"
              alt="kaire"
              src="/assets/images/clients/kaire.png"
            />
            <NextImg
              auto
              height="40px"
              sizes="25vw"
              alt="simm"
              src="/assets/images/clients/simm.png"
            />
            <NextImg
              auto
              height="40px"
              sizes="25vw"
              alt="LCI Agency"
              src="/assets/images/clients/lci-agency.png"
            />
            <NextImg
              auto
              height="40px"
              sizes="25vw"
              alt="mentorz"
              src="/assets/images/clients/mentorz.png"
            />
            <NextImg
              auto
              height="40px"
              sizes="25vw"
              alt="massyve"
              src="/assets/images/clients/massyve.png"
            />
            <NextImg
              auto
              height="40px"
              sizes="25vw"
              alt="cody"
              src="/assets/images/clients/cody.png"
            />
            <NextImg
              auto
              height="40px"
              sizes="25vw"
              alt="The Pink Palace"
              src="/assets/images/clients/pink-palace.png"
            />
          </ChosenBy>
        </Section>
        <Section id="who-we-are">
          <WhoWeAre />
        </Section>
        <Section
          id="services"
          showBackground
          background={pcbBackground(theme)}
          backgroundSx={{ opacity: 0.4 }}
        >
          <Services />
        </Section>
        <Section id="how-we-work">
          <OurProcess />
        </Section>
        <GetAQuoteSection />
        <Section
          id="faq"
          showBackground
          background={netBackground(theme)}
          backgroundSx={{
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'top',
            opacity: 0.05,
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
              { question: t('faq-q1'), answer: t('faq-a1', true) },
              { question: t('faq-q2'), answer: t('faq-a2', true) },
              { question: t('faq-q3'), answer: t('faq-a3', true) },
              {
                question: t('faq-q4'),
                answer: (
                  <>
                    {t('faq-a4', true)}&nbsp;{' '}
                    <Link href="/techs" onClick={clickNavigate('/techs')}>
                      {' '}
                      {t('here')}{' '}
                    </Link>
                    .
                  </>
                ),
              },
              { question: t('faq-q5'), answer: t('faq-a5', true) },
              { question: t('faq-q6'), answer: t('faq-a6', true) },
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
      </Sections>
    </Page>
  );
}
