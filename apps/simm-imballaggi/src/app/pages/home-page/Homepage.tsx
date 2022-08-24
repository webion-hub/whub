import { useTheme } from "@mui/material";
import { Page, Section, Sections, useBackgroundWaves } from "@whub/wui";
import Home from "./Home";
import MapSection from "./MapSection";


export default function Homepage() {
  const theme = useTheme()

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
              background: 'url(assets/images/homepageImage.jpg)',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center center',
              backgroundSize: 'cover'
            }
          }}
        >
          <Home/>
        </Section>
        <Section
          id="who"
          showBackground
        >
          <MapSection/>
        </Section>
      </Sections>
    </Page>
  );
}
