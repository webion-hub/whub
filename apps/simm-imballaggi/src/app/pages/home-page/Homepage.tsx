import { useTheme } from "@mui/material";
import { Page, Section, Sections, useBackgroundWaves } from "@whub/wui";
import Home from "./Home";
import MapSection from "./MapSection";


export default function Homepage() {
  const theme = useTheme()
  const waves = useBackgroundWaves(theme.palette['secondary'].light)

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
              opacity: 0.15,
              top: 0,
              zIndex: 0,
              transform: 'rotate(0deg) ',
              ...waves,
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
