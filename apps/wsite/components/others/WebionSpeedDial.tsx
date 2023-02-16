import EmailRounded from '@mui/icons-material/EmailRounded';
import Facebook from '@mui/icons-material/Facebook';
import GitHub from '@mui/icons-material/GitHub';
import Instagram from '@mui/icons-material/Instagram';
import LinkedIn from '@mui/icons-material/LinkedIn';
import PhoneRounded from '@mui/icons-material/PhoneRounded';


import SpeedDial from "@webion/ui-components/SpeedDial";
import { WebionRepository } from "../../lib/WebionRepositiory";


export default function WebionSpeedDial() {
  return (
    <SpeedDial
      actions={[
        {
          name: 'Email',
          Icon: EmailRounded,
          onClick: WebionRepository.openEmail,
        },
        {
          name: 'Telefono',
          Icon: PhoneRounded,
          onClick: WebionRepository.openPhone,
        },
        {
          name: 'GitHub',
          Icon: GitHub,
          onClick: WebionRepository.openGithub,
        },
        {
          name: 'Instagram',
          Icon: Instagram,
          onClick: WebionRepository.openInstagram,
        },
        {
          name: 'Facebook',
          Icon: Facebook,
          onClick: WebionRepository.openFacebook,
        },
        {
          name: 'Linkedin',
          Icon: LinkedIn,
          onClick: WebionRepository.openLinkedin,
        },
      ]}
    />
  )
}