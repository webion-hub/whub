import Home from "./sections/Home";
import AIDA from "./sections/AIDA";
import Services from "./sections/Services";
import Contacts from "./sections/Contacts";
import Projects from "./sections/Projects";
import HowWeWork from "./sections/HowWeWork";
import { Page, ResponserGrid, Section, Sections, useLayout } from "@whub/wui";
import { pcbBackground } from "../../components/backgrounds/pcbBackground";
import { Stack, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";

export default function LandingPage() {
  const theme = useTheme();
  const layout = useLayout();

  useEffect(() => {
    layout.setAppBarStatus(false)
    layout.setSidebarStatus(false)
    layout.setFooterStatus(false)

    return () => {
      layout.setAppBarStatus(true)
      layout.setSidebarStatus(true)
      layout.setFooterStatus(true)
    }
  }, [])

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
          maxWidth: "2000px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <source
          src="../../../assets/images/business.mp4"
          type="video/mp4"
          style={{
            backgroundColor: "rgba(0,0,0,.5) !important",
            width: "130%",
          }}
        />
      </video>
      {/* <iframe name="opinionstage-widget" src="https://www.opinionstage.com/api/v1/widgets/1045129/iframe?em=1"  width="100%" height="800" scrolling="auto" style={{border: "none"}} frameBorder="0" allow="fullscreen"></iframe> */}

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
          sx={{ maxWidth: "100%", width: "100%", }}
        >
          <Home />
        </Section>
        <Section
          showBackground
          backgroundSx={{
            backgroundColor: "black !important",
            borderBottom: "0.7px solid #202020",
          }}
          sx={{ paddingBlock: 3 }}
        >
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={2}
            sx={{ maxWidth: "100%", width: "900px" }}
          >
            <Typography variant="h5" sx={{ textAlign: "center", width: "180px", whiteSpace: "nowrap"}}>
              Ci hanno scelto
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              flexWrap="wrap"
              sx={{
                "& > *": {
                  userSelect: "none",
                  padding: 2,
                  height: "fit-content",
                  filter: "grayscale(100%)",
                },
                width: "100%",
                paddingTop: { xs: 1, md: 0},
              }}
            >
              <img src="../../../assets/images/mentorzLogo.png" />
              <img src="../../../assets/images/corfuLogo.png" />
              <img src="../../../assets/images/kaireLogo.png" />
              <img src="../../../assets/images/simmLogo.png" />
              <img src="../../../assets/images/codyLogo.png" />
            </Stack>
          </Stack>
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
          id="projects"
          showBackground
          backgroundSx={{ backgroundColor: "black !important" }}
        >
          <Projects />
        </Section>
        <Section
          id="how-we-work"
          showBackground
          maxWidth="100%"
          backgroundSx={{ backgroundColor: "black !important" }}
        >
          <HowWeWork />
        </Section>
        <Section
          id="contacts"
          maxWidth="100%"
          showBackground
          backgroundSx={{ backgroundColor: "black !important" }}
        >
          <Contacts />
        </Section>
      </Sections>
    </Page>
  );
}
