import { Button, Divider, Grid, IconButton, Link, styled, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";
import React from "react";
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Footer, FooterBottomLabel, FooterColumn, FooterContent, Img } from "@whub/wui";
import InstagramIcon from '@mui/icons-material/Instagram';

const FooterButton = styled(Button)(({theme}) => ({
  alignSelf: "auto",
  width: "fit-content",
  marginLeft: theme.spacing(-1, '!important'),
  minWidth: 0,
}))

const WebionFooter = React.forwardRef<HTMLDivElement, Record<string, never>>((_, ref) => {
  const { t } = useTranslation();
  
  const typoSx = {
    textAlign: "left",
    width: "fit-content",
    margin: 0,
  };

  return (
    <Footer ref={ref}>
      <FooterContent>
        <FooterColumn StackProps={{ alignItems: {xs:'center', md: "baseline"}}}>
          <Typography variant="subtitle2">
            HOME
          </Typography>
          <FooterButton
            color="info"
            href="/#home"
          >
            {t("navbar-button1")}
          </FooterButton>
          <FooterButton
            color="info"
            href="/#services"
          >
            {t("navbar-button2")}
          </FooterButton>
          <FooterButton
            color="info"
            href="/#projects"
          >
            {t("navbar-button3")}
          </FooterButton>
          <FooterButton
            color="info"
            href="/#contacts"
          >
            {t("navbar-button5")}
          </FooterButton>
        </FooterColumn>
        <FooterColumn StackProps={{ alignItems: {xs:'center', md: "baseline"}, }} >
          <Typography variant="subtitle2" sx={typoSx}>
          {t("contact-us-title")}
          </Typography>
          <FooterButton 
            color="info" 
            onClick={() => window.open("http://maps.google.com/?q=Webion SRL", '_blank')?.focus()}
          >
            via Panfilo Castaldi 3, Modena
          </FooterButton>
          <FooterButton 
            color="info" 
            href="tel:+39 389 008 6632"
          >
            +39 389 008 6632
          </FooterButton>
          <FooterButton
            color="info" 
            href="mailto:amministrazione@webion.it"
          >
            amministrazione@webion.it
          </FooterButton>
        </FooterColumn>
        <FooterColumn 
          StackProps={{ 
            alignItems: {xs:'center', md: "left"}, 
          }} 
        >
          <Typography variant="subtitle2">
            SOCIAL
          </Typography>
          <Grid 
            container 
            sx={{justifyContent: "center"}}
          >
            <IconButton 
              aria-label="facebook" 
              size="large" 
              href="https://www.facebook.com/Webion-107914721922394" 
              target="_blank" 
              color="primary"
            >
              <FacebookIcon fontSize="inherit" />
            </IconButton>
            <IconButton 
              aria-label="facebook" 
              size="large" 
              href="https://www.quora.com/profile/Webion" 
              target="_blank" 
              color="primary"
            >
              <Img
                width="25px"
                height="20px"
                src="/assets/images/quoraIcon.svg"
              />
            </IconButton>
            <IconButton 
              aria-label="instagram" 
              size="large" 
              href="https://www.instagram.com/webion.it/" 
              target="_blank" 
              color="primary"
            >
              <InstagramIcon fontSize="inherit" />
            </IconButton>
            <IconButton 
              aria-label="linkedin" 
              size="large" 
              href="https://www.linkedin.com/company/webion-srl/about/" 
              target="_blank" 
              color="primary"
            >
              <LinkedInIcon fontSize="inherit" />
            </IconButton>
            <IconButton 
              aria-label="github" 
              size="large" 
              href="https://github.com/webion-hub" 
              target="_blank" 
              color="primary"
            >
              <GitHubIcon fontSize="inherit" />
            </IconButton>
          </Grid>
        </FooterColumn>
      </FooterContent>
      <Divider sx={{ width: "90%", margin: 'auto' }}/>
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
        {t("p-iva")}
        <Link
          sx={{ marginLeft: 1 }}
          color="inherit"
          href="mailto:webionsrl@legalmail.it"
        >
          webionsrl@legalmail.it
        </Link>
      </FooterBottomLabel>
    </Footer>
  );
})

export default WebionFooter
