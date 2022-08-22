import Home from "./sections/Home";
import AIDA from "./sections/AIDA";
import Services from "./sections/Services";
import Contacts from "./sections/Contacts";
import Projects from "./sections/Projects";
import HowWeWork from "./sections/HowWeWork";
import { Page, Section, Sections } from "@whub/wui";
import { pcbBackground } from "../../components/backgrounds/pcbBackground";
import { useTheme } from "@mui/material";


export default function LandingPage() {
  const theme = useTheme()

  return (
    <Page sx={{ marginTop: 0, backgroundColor: "black" }}>
      <Sections sx={{
        
        backgroundImage: "url(../../../assets/images/business.png)",
        backgroundSize: "auto",
        backgroundRepeat: "no-repeat",
      }}>
        <Section>
          <Home />
        </Section>
        <Section
          id="about-us"
          maxWidth="100%"
        >
          <AIDA />
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
          sx={{ padding: 0 }}
        >
          <Contacts />
        </Section>
      </Sections>
    </Page>
  );
}
