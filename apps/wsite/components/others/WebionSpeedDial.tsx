import EmailRounded from '@mui/icons-material/EmailRounded';
import GitHub from '@mui/icons-material/GitHub';
import LinkedIn from '@mui/icons-material/LinkedIn';
import PhoneRounded from '@mui/icons-material/PhoneRounded';


import SpeedDial from "@wui/components/SpeedDial";
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
          name: 'Linkedin',
          Icon: LinkedIn,
          onClick: WebionRepository.openLinkedin,
        },
      ]}
    />
  )
}