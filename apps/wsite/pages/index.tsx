import { useTheme } from '@mui/material';
import { ChosenBy } from '@whub/page-sections';
import {
  NextImg,
  Page, PageSettings, Section,
  Sections
} from '@whub/wui';
import { useEffect } from 'react';
import { pcbBackground } from '../components/backgrounds/pcbBackground';
import { FaqSection } from '../components/sections/FaqSection';
import { GetAQuoteSection } from '../components/sections/GetAQuote';
import { HomeWithServices } from '../components/sections/HomeWithServices';
import OurProcess from '../components/sections/OurProcess';
import Services from '../components/sections/Services';
import { WhoWeAre } from '../components/sections/WhoWeAre';

export default function Homepage() {
  const theme = useTheme();

  useEffect(() => {
    import('react-facebook-pixel')
      .then((m) => m.default)
      .then((r) => r.track('ViewContent'));
  }, []);

  return (
    <Page sx={{ marginTop: 0, margin: 'Auto' }}>
      <PageSettings pageTranslationName="home" />
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
          sx={{
            paddingBlock: 4,
            overflow: 'hidden',
            '::-webkit-scrollbar': {
              display: 'none',
            },
            width: 'auto',
            position: 'relative',
          }}
        >
          <ChosenBy>
            <ClientLogos />
          </ChosenBy>
        </Section>
        <Section id="who-we-are">
          <WhoWeAre />
        </Section>
        <Section
          id="services"
          showBackground
          background={pcbBackground(theme)}
          backgroundSx={{ opacity: theme.palette.mode === 'dark' ? 1 : 0.4 }}
        >
          <Services />
        </Section>
        <Section id="how-we-work">
          <OurProcess />
        </Section>
        <GetAQuoteSection />
        <FaqSection/>
      </Sections>
    </Page>
  );
}

export function ClientLogos() {
  return (
    <>
      <NextImg
        priority
        auto
        height="28px"
        sizes="25vw"
        alt="bocconi"
        src="/assets/images/clients/gianos.png"
      />
      <NextImg
        priority
        auto
        height="28px"
        sizes="25vw"
        alt="simm"
        src="/assets/images/clients/simm.png"
      />
      <NextImg
        priority
        auto
        height="28px"
        sizes="25vw"
        alt="bocconi"
        src="/assets/images/clients/bocconi.png"
      />
      <NextImg
        priority
        auto
        height="28px"
        sizes="25vw"
        alt="kaire"
        src="/assets/images/clients/kaire.png"
      />
      <NextImg
        priority
        auto
        height="28px"
        sizes="25vw"
        alt="LCI Agency"
        src="/assets/images/clients/lci-agency.png"
      />
      <NextImg
        priority
        auto
        height="28px"
        sizes="25vw"
        alt="mentorz"
        src="/assets/images/clients/mentorz.png"
      />
      <NextImg
        priority
        auto
        height="28px"
        sizes="25vw"
        alt="massyve"
        src="/assets/images/clients/massyve.png"
      />
      <NextImg
        priority
        auto
        height="28px"
        sizes="25vw"
        alt="The Pink Palace"
        src="/assets/images/clients/pink-palace.png"
      />
      <NextImg
        priority
        auto
        height="28px"
        sizes="25vw"
        alt="The Pink Palace"
        src="/assets/images/clients/elfo-avventure.png"
      />
    </>
  );
}
