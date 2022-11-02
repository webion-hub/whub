import { Page, Section, Sections } from "@whub/wui";
import Home from "./Home";
import MapSection from "./MapSection";


export default function Homepage() {
  return (
    <Page>
      <Sections>
        <Section
          id="home"
          sx={{
            padding: 0,
            "&::after": {
              content: "''",
              position: 'absolute',
              width: '100vw',
              height: '100%',
              top: 0,
              zIndex: 0,
              background: 'url(assets/images/homepageImage.webp)',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              filter: { xs: 'brightness(0.4)', lg: 'none' }
            }
          }}
        >
          <Home/>
        </Section>
        <Section
          id="chi-siamo"
          showBackground
        >
          <MapSection/>
        </Section>
      </Sections>
    </Page>
  );
}

