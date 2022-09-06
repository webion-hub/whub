import Home from "../components/sections/Home";
import AIDA from "../components/sections/AIDA";
import Services from "../components/sections/Services";
import Contacts from "../components/sections/Contacts";
import Projects from "../components/sections/Projects";
import HowWeWork from "../components/sections/HowWeWork";
import { Page, Section, Sections } from "@whub/wui";
import { pcbBackground } from "../components/backgrounds/pcbBackground";
import { useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import ReactPixel from 'react-facebook-pixel';



export default function Homepage() {
  const theme = useTheme();
  useEffect(() => {
    ReactPixel.track('ViewContent');
  });

  return (
    <Page sx={{ marginTop: 0, margin: "Auto" }}>
      <Sections>
        <Section
          id="home"
          sx={{  width: "100%", zIndex: 2, margin: "auto"}}
        >
          <Home />
        </Section>
        <Section
          id="about-us"
          maxWidth="100%"
        >
          <AIDA />
        </Section>
        <Section
          id="services"
          showBackground
          background={pcbBackground(theme)}
          backgroundSx={{ opacity: 0.4 }}
        >
          <Services />
        </Section>
        <Section
          id="projects"
          showBackground
        >
          <Projects />
        </Section>
        <Section
          id="how-we-work"
          showBackground
          maxWidth="100%"
        >
          <HowWeWork />
        </Section>
        <Section
          id="contacts"
          maxWidth="100%"
          showBackground
          sx={{
            padding: 0,
            width: '100vw'
          }}
        >
          <Contacts />
        </Section>
      </Sections>
    </Page>
  );
}
