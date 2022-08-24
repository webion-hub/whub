import Home from "./sections/Home";
import AIDA from "./sections/AIDA";
import Services from "./sections/Services";
import Contacts from "./sections/Contacts";
import Projects from "./sections/Projects";
import HowWeWork from "./sections/HowWeWork";
import { AppBarLogo, FooterBottomLabel, Page, ResponserGrid, Section, Sections, useLayout } from "@whub/wui";
import { pcbBackground } from "../../components/backgrounds/pcbBackground";
import { Link, Stack, Typography, Box } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function LandingPage() {
  const { t } = useTranslation();
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
      {/* <iframe name="opinionstage-widget" src="https://www.opinionstage.com/api/v1/widgets/1045129/iframe?em=1"  width="100%" height="800" scrolling="auto" style={{border: "none"}} frameBorder="0" allow="fullscreen"></iframe> */}
      <Box
        sx={{
          position: 'absolute',
          maxWidth: theme => theme.layoutMaxWidth?.section,
          width: '100%',
          zIndex: 3,
          transform: 'translateX(-50%)',
          left: '50%',
          marginTop: 2,
          paddingLeft: 3,
        }}
      >
        <AppBarLogo
          label="Webion"
          src="assets/images/logoTransparentBackground.svg"
          buttonSx={{ pointerEvents: 'none' }}
          sx={{ padding: 1 }}
        />
      </Box>
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
            {t("chosen-by")}
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
          sx={{ width: '100vw', paddingBlock: 0, }}
        >
          <Contacts />
        </Section>
      </Sections>
      <Section
      showBackground
      backgroundSx={{ backgroundColor: "black !important" }}>
      <FooterBottomLabel
        TypographyProps={{ variant: "caption" }}
      >
        <Link
          href="/policies-licenses"
          target="_blank"
          sx={{ marginRight: 1 }}
          color="inherit"
        >
          {t("privacy-link")}
        </Link>
        <Typography variant="caption">
          {t("p-iva")}
        </Typography>
        <Link
          sx={{ marginLeft: 1 }}
          color="inherit"
          href={"mailto:" + "webionsrl@legalmail.it"}
        >
          {"webionsrl@legalmail.it"}
        </Link>
      </FooterBottomLabel>
      </Section>
      
    </Page>
  );
}
