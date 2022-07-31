import Home from "../../pages/home-page/sections/Home";
import AIDA from "./sections/AIDA";
import Services from "./sections/Services";
import Contacts from "./sections/Contacts";
import Projects from "./sections/Projects";
import HowWeWork from "./sections/HowWeWork";
import { styled } from "@mui/system";
import { Sections } from "@whub/wui";

const Section = styled('section')({})
const sectionSx = {
  paddingBlock: "100px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
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
            xs: "45% calc(50% + 80px)",
            md: "calc(50% + 300px) 30px",
          },
          backgroundSize: "cover",
          minHeight: "800px",
        }
      }>
        <Home />
      </Section>
      <Section id="about-us" sx={sectionSx}>
        <AIDA />
      </Section>
      <Section id="services" sx={sectionSx}>
        <Services />
      </Section>
      <Section id="projects" sx={sectionSx}>
        <Projects />
      </Section>
      <Section id="how-we-work"  sx={sectionSx}>
        <HowWeWork />
      </Section>
      <Section id="contacts">
        <Contacts />
      </Section>
    </Sections>
  );
}
