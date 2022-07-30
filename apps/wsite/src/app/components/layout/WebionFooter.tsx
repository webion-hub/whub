import { Button, Divider, Grid, IconButton, Link, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";
import React from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Footer, FooterBottomLabel, FooterColumn, FooterContent } from "@whub/wui";
import InstagramIcon from '@mui/icons-material/Instagram';

const WebionFooter = React.forwardRef<HTMLDivElement, Record<string, never>>((_, ref) => {
  const { t } = useTranslation();
  
  const typoSx = {
    textAlign: "left",
    width: "fit-content",
    margin: 0,
  };

  const buttonSx = {
    alignSelf: "auto",
    padding: 0,
    width: "fit-content",
    margin: "0px",
    minWidth: "0px",
  };

  return (
    <Footer ref={ref}>
      <FooterContent>
        <FooterColumn StackProps={{ alignItems: {xs:'center', md: "baseline"}}}>
          <Typography variant="subtitle2" sx={buttonSx}>
            HOME
          </Typography>
          <Button
            sx={buttonSx}
            color="info"
            href="/#home"
          >
            {t("navbar-button1")}
          </Button>
          <Button
            sx={buttonSx}
            color="info"
            href="/#services"
          >
            {t("navbar-button2")}
          </Button>
          <Button
            sx={buttonSx}
            color="info"
            href="/#projects"
          >
            {t("navbar-button3")}
          </Button>
          <Button
            sx={buttonSx}
            color="info"
            href="/#contacts"
          >
            {t("navbar-button5")}
          </Button>
        </FooterColumn>
        {/* <FooterColumn StackProps={{ alignItems: 'center' }}>
          <Typography variant="subtitle2" sx={typoSx}>
            PRODOTTI
          </Typography>
          <Button sx={buttonSx} color="info" href="/wui">
            wui
          </Button>
          <Button sx={buttonSx} color="info" href="/#projects">
            wui+
          </Button>
        </FooterColumn>
        <FooterColumn>
          <Typography variant="subtitle2" sx={typoSx}>
            BLOG
          </Typography>
          <Button sx={buttonSx} color="info" href="/blog">
            Blog
          </Button>
        </FooterColumn>
        <FooterColumn StackProps={{ alignItems: 'center' }}>
          <Typography variant="subtitle2" sx={typoSx}>
            SHOP
          </Typography>
          <Button sx={buttonSx} color="info" href="/shop">
            Shop
          </Button>
        </FooterColumn> */}
        <FooterColumn StackProps={{ alignItems: {xs:'center', md: "baseline"}, }} >
          <Typography variant="subtitle2" sx={typoSx}>
          {t("contact-us-title")}
          </Typography>
          <Button sx={buttonSx} color="info" href="http://maps.google.com/?q=Webion SRL" target="_blank">
            via Panfilo Castaldi 3, Modena
          </Button>
          <Button sx={buttonSx} color="info" href="tel:+39 389 008 6632">
            +39 389 008 6632
          </Button>
          <Button sx={buttonSx} color="info" href="mailto:amministrazione@webion.it">
            amministrazione@webion.it
          </Button>
        </FooterColumn>
        <FooterColumn StackProps={{ alignItems: {xs:'center', md: "left"}, }} >
          <Typography variant="subtitle2">
            SOCIAL
          </Typography>
          <Grid container sx={{justifyContent: "center"}}>
            <IconButton aria-label="facebook" size="large" href="https://www.facebook.com/Webion-107914721922394" color="primary">
              <FacebookIcon fontSize="inherit" />
            </IconButton>
            <IconButton aria-label="instagram" size="large" href="https://www.instagram.com/webion.it/" color="primary">
              <InstagramIcon fontSize="inherit" />
            </IconButton>
            <IconButton aria-label="linkedin" size="large" href="https://www.linkedin.com/company/webion-srl/about/" color="primary">
              <LinkedInIcon fontSize="inherit" />
            </IconButton>
            <IconButton aria-label="github" size="large" href="https://github.com/webion-hub" color="primary">
              <GitHubIcon fontSize="inherit" />
            </IconButton>
          </Grid>
        </FooterColumn>
      </FooterContent>
      <Divider sx={{ width: "90%", margin: 'auto' }}/>
      <FooterBottomLabel
        TypographyProps={{ variant: "caption" }}
      >
        {t("p-iva")}
        <Link
          href=""
          sx={{
            marginLeft: 1,
            fontSize: "14px",
          }}
          color="inherit"
        >
          webionsrl@legalmail.it
        </Link>
      </FooterBottomLabel>
      {/*<Box alignSelf="right">
        <Button href="https://it.linkedin.com/company/webion-srl?trk=companies_directory">
          <LinkedInIcon color="primary" />
        </Button>
        <Button href="https://github.com/webion-hub">
          <GitHubIcon color="primary" />
        </Button>
        </Box>*/}
    </Footer>
  );
})

export default WebionFooter