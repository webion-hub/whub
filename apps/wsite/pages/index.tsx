import { useTheme } from '@mui/material';
import { Page, Section, Sections, useBackgroundWaves } from '@whub/wui';
import { useEffect } from 'react';
import { pcbBackground } from '../components/backgrounds/pcbBackground';
import { ChosenBy } from '../components/sections/ChosenBy';
import { Faq } from '../components/sections/Faq';
import { GetAQuote, GetAQuoteSection } from '../components/sections/GetAQuote';
import { HomeWithServices } from '../components/sections/HomeWithServices';
import OurProcess from '../components/sections/OurProcess';
import Services from '../components/sections/Services';
import { WhoWeAre } from '../components/sections/WhoWeAre';

export default function Homepage() {
  const theme = useTheme();
  const waves = useBackgroundWaves(theme.palette.primary.light);

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
          <ChosenBy />
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
          backgroundSx={{
            transform: 'rotate(180deg)',
            opacity: 0.4,
            ...waves,
          }}
        >
          <Faq />
        </Section>
      </Sections>
    </Page>
  );
}
