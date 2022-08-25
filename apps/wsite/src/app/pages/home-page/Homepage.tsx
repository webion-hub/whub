import Home from "../../pages/home-page/sections/Home";
import AIDA from "./sections/AIDA";
import Services from "./sections/Services";
import Contacts from "./sections/Contacts";
import Projects from "./sections/Projects";
import HowWeWork from "./sections/HowWeWork";
import { Page, Section, Sections } from "@whub/wui";
import { pcbBackground } from "../../components/backgrounds/pcbBackground";
import { useTheme } from "@mui/material";


export default function Homepage() {
  const theme = useTheme()

  return (
    <Page sx={{ marginTop: 0, backgroundColor: "black", margin: "Auto" }}>
      <video
        autoPlay
        muted
        loop
        id="myVideo"
        style={{
          position: "fixed",
          backgroundColor: "rgba(0,0,0,.5) !important",
          width: '100vw',
          height: '100vh',
          maxHeight: '1200px',
          objectFit: 'cover',
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <source
          src="../../../assets/images/background.webm"
          type="video/mp4"
          style={{
            backgroundColor: "rgba(0,0,0,.5) !important",
            width: "130%",
          }}
        />
      </video>
      <Sections
        sx={{
          backgroundImage: "url(../../../assets/images/business)",
          backgroundRepeat: "no-repeat",
          backgroundColor: "black",
          margin: "auto",
          maxWidth: "100vw !important"
        }}
      >
        <Section
          showBackground
          backgroundSx={{ backgroundColor: "rgba(0,0,0,.5)" }}
          sx={{ maxWidth: "100%", width: "100%", zIndex: 2 }}
        >
          <Home />
        </Section>
        <Section
          id="about-us"
          maxWidth="100%"
          showBackground
          backgroundSx={{ backgroundColor: "black !important" }}
        >
          <AIDA />
        </Section>
        <Section
          id="services"
          showBackground
          background={pcbBackground(theme)}
          backgroundSx={{ backgroundColor: "black !important" }}
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
    </Page>
  );
}
