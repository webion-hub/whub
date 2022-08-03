import Home from "../../pages/home-page/sections/Home";
import AIDA from "./sections/AIDA";
import Services from "./sections/Services";
import Contacts from "./sections/Contacts";
import Projects from "./sections/Projects";
import HowWeWork from "./sections/HowWeWork";
import { styled } from "@mui/system";
import { Sections } from "@whub/wui";
import { pcbBackground } from "../../components/backgrounds/pcbBackground";

const Section = styled('section')(({theme}) => ({
  paddingBlock: theme.spacing(8),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: 'relative'
}))

export default function Homepage() {

  return (
    <Sections sx={{overflow: "hidden"}}>
      <Section 
        id="home"
        sx={{
          padding: 0,
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
      <Section id="about-us">
        <AIDA />
      </Section>
      <Section 
        id="services"
        sx={{
          backgroundImage: theme => pcbBackground(theme)
        }}  
      >
        <Services />
      </Section>
      <Section 
        id="projects"
        sx={{ 
          background: theme => theme.palette['secondaryBackground'].default,
          boxShadow: '0px -8px 8px #00000085'
        }}
      >
        <Projects />
      </Section>
      <Section 
        id="how-we-work"
        sx={{ background: theme => theme.palette['secondaryBackground'].default}}  
      >
        <HowWeWork />
      </Section>
      <Section 
        id="contacts" 
        sx={{ 
          background: theme => theme.palette['secondaryBackground'].default, 
          padding: 0
        }}
      >
        <Contacts />
      </Section>
    </Sections>
  );
}
