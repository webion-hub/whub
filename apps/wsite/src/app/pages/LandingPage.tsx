import { Box, Divider, Link, Stack, Typography } from "@mui/material";
import { AppBarLogo, FooterBottomLabel, Img, Page, Section, Sections, useLayout } from "@whub/wui";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import AIDA from "../components/sections/AIDA";
import { ChosenBy } from "../components/sections/ChosenBy";
import Contacts from "../components/sections/Contacts";
import ContactUsHome from "../components/sections/ContactUsHome";
import HowWeWork from "../components/sections/HowWeWork";
import Projects from "../components/sections/Projects";

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
    <Page sx={{ marginTop: 0, margin: "Auto" }}>
      {/*<video
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
        </video>*/}
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
      <Sections>
        <Section>
          <ContactUsHome />
        </Section>
        <Section
          id="chosen-by"
          sx={{ paddingBlock: 3 }}
        >
          <ChosenBy/>
        </Section>
        <Section
          id="about-us"
          maxWidth="100%"
        >
          <AIDA />
        </Section>
        <Section
          id="projects"
        >
          <Projects />
        </Section>
        <Section
          id="how-we-work"
          maxWidth="100%"
          showBackground
        >
          <HowWeWork />
        </Section>
        <Section
          id="contacts"
          maxWidth="100%"
          showBackground
          sx={{ width: '100vw', paddingBlock: 0, }}
        >
          <Contacts />
        </Section>
      </Sections>
      <Section>
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


