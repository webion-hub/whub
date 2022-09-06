import { Img, WuiFooterSectionProps, WuiFooter } from "@whub/wui";
import { useTranslation } from "react-i18next";

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import { WebionRepository } from "../../lib/WebionRepositiory";

export default function WebionFooter() {
  const {t} = useTranslation()
  const sections: WuiFooterSectionProps[] = [
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
            text: WebionRepository.ADDRESS,
            onClick: WebionRepository.openAddress
          },
          {
            text: WebionRepository.PHONE,
            href: WebionRepository.HREF_PHONE,
          },
          {
            text: WebionRepository.EMAIL,
            href: WebionRepository.HREF_EMAIL,
          },
      ]
    },
  ]

  const socials = [
    {
      href: WebionRepository.FACEBOOK,
      icon: <FacebookIcon fontSize="inherit"  aria-label="facebook button"/>
    },
    {
      href: WebionRepository.QUORA,
      icon: <Img width="25px" alt="quora logo" height="20px" src="/assets/images/quoraIcon.svg"/>
    },
    {
      href: WebionRepository.INSTAGRAM,
      icon: <InstagramIcon fontSize="inherit" aria-label="instagram button"/>
    },
    {
      href: WebionRepository.LINKEDIN,
      icon: <LinkedInIcon fontSize="inherit" aria-label="linkedin button" />
    },
    {
      href: WebionRepository.GITHUB,
      icon: <GitHubIcon fontSize="inherit" aria-label="github button"/>
    },
  ]

  return(
    <WuiFooter
      sectionsProps={sections}
      socialsProps={socials}
      privacyLink={t("privacy-link")}
      extraText={`P.Iva/CF ${WebionRepository.IVA}`}
      mailLink={WebionRepository.PEC}
    />
  )
}
