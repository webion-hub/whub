import { Img, SectionProps, WuiFooter } from "@whub/wui";
import { useTranslation } from "react-i18next";

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function SimmFooter() {
  const {t} = useTranslation()
  const sections: SectionProps[] = [
    {
      title: "Home",
      buttons: 
        [
          {
            text: t("navbar-button1"),
            href: "/#home",
          },
          {
            text: t("navbar-button2"),
            href: "/#services",
          },
          {
            text: t("navbar-button3"),
            href: "/#projects",
          },
          {
            text: t("navbar-button5"),
            href: "/#contacts",
          },
      ]
    },
    {
      title: t("contact-us-title"),
      buttons: 
        [
          {
            text: "via Panfilo Castaldi 3, Modena",
            onClick: () => window.open("http://maps.google.com/?q=Webion SRL", '_blank')?.focus()
          },
          {
            text: "+39 389 008 6632",
            href: "tel:+39 389 008 6632",
          },
          {
            text: "amministrazione@webion.it",
            href: "mailto:amministrazione@webion.it",
          },
      ]
    },
  ]

  const socials = [
    {
      href: "https://www.facebook.com/Webion-107914721922394",
      icon: <FacebookIcon fontSize="inherit" />
    },
    {
      href: "https://www.quora.com/profile/Webion",
      icon: <Img width="25px" height="20px" src="/assets/images/quoraIcon.svg"/>
    },
    {
      href: "https://www.instagram.com/webion.it/",
      icon: <InstagramIcon fontSize="inherit" />
    },
    {
      href: "https://www.linkedin.com/company/webion-srl/about/",
      icon: <LinkedInIcon fontSize="inherit" />
    },
    {
      href: "https://github.com/webion-hub",
      icon: <GitHubIcon fontSize="inherit" />
    },
  ]

  return(
    <WuiFooter 
      sectionsProps={sections} 
      socialsProps={socials}
      privacyLink={t("privacy-link")}
      extraText={t("p-iva")}
      mailLink="webionsrl@legalmail.it"
    />
  )
}