import { SidebarButtonProps, WuiSideBar } from "@whub/wui";
import { useTranslation } from "react-i18next";

import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DesignServicesRoundedIcon from "@mui/icons-material/DesignServicesRounded";
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';

export default function WebionSideBar() {
  const { t } = useTranslation()

  const buttons: SidebarButtonProps[] = [
  {
    text: t("navbar-button1"),
    icon: HomeRoundedIcon,
    href: "/#home"
  },
  {
    text: t("navbar-button2"),
    icon: DesignServicesRoundedIcon,
    href: "/#services"
  },
  {
    text: t("navbar-button3"),
    icon: AssignmentTurnedInRoundedIcon,
    href: "/#projects"
  },
  {
    text: t("navbar-button5"),
    icon: LocalPhoneRoundedIcon,
    href: "/#contacts",
    afterLanguage: true,
  },
]

  return(
    <WuiSideBar
      languageComponent={PublicRoundedIcon} 
      buttonsProps={buttons}    
    />
  )
}