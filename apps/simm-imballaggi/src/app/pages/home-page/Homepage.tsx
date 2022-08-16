import { useTheme } from "@mui/system";
import { Section, Sections, useBackgroundWaves } from "@whub/wui";
import Home from "./Home";
import MapSection from "./MapSection";


export default function Homepage() {
  const theme = useTheme()
  const waves = useBackgroundWaves(theme.palette['secondary'].light)

  return (
    <Sections
      sx={{
        overflow: "hidden",
        marginTop: 10,
      }}>
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
            transform: 'rotate(-180deg) ',
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
  );
}
