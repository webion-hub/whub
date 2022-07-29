import Home from "../../pages/home-page/sections/Home";
import AIDA from "./sections/AIDA";
import Services from "./sections/Services";
import Contacts from "./sections/Contacts";
import Projects from "./sections/Projects";
import HowWeWork from "./sections/HowWeWork";
import { styled } from "@mui/system";
import { Sections } from "@whub/wui";

const Section = styled('section')({})

export default function Homepage() {
  return (
    <Sections sx={{overflow: "hidden"}}>
      <Section 
        id="home"
        sx={{
          backgroundImage: {
            xs: "url('assets/images/backgroundMobile-min.png')",
            md: "url('assets/images/background-min.png')",
          },
          backgroundPosition: {
            xs: "center calc(50% + 100px)",
            md: "calc(50% + 300px) 30px",
          },
          backgroundSize: "cover",
          minHeight: "800px",
        }
      }>
        <Home />
      </Section>
      <Section id="about-us">
        <AIDA />
      </Section>
      <Section id="services">
        <Services />
      </Section>
      <Section id="projects">
        <Projects />
      </Section>
      <Section id="how-we-work">
        <HowWeWork />
      </Section>
      <Section id="contacts">
        <Contacts />
      </Section>
    </Sections>
  );
}
