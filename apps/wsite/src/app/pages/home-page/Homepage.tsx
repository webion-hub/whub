import Home from "../../pages/home-page/sections/Home";
import AIDA from "./sections/AIDA";
import Services from "./sections/Services";
import Contacts from "./sections/Contacts";
import Projects from "./sections/Projects";
import HowWeWork from "./sections/HowWeWork";
import { Section, Sections } from "@whub/wui";
import { pcbBackground } from "../../components/backgrounds/pcbBackground";
import { useTheme } from "@mui/material";


export default function Homepage() {
  const theme = useTheme()

  return (
    <Sections sx={{overflow: "hidden"}}>
      <Section
        id="home"
        maxWidth="100%"
        sx={{
          padding: 0,
          backgroundImage: {
            xs: "url('assets/images/backgroundMobile-min.webp')",
            md: "url('assets/images/background-min.webp')",
          },
          backgroundPosition: {
            xs: "45% 50%",
            md: "calc(50% + 300px) 0px",
          },
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "800px",
        }
      }>
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
        sx={{ padding: 0 }}
      >
        <Contacts />
      </Section>
    </Sections>
  );
}
