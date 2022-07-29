import DesignServicesRoundedIcon from "@mui/icons-material/DesignServicesRounded";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import React from "react";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import { SideBar, SideBarItem } from "@whub/wui";

const WebionSideBar = React.forwardRef<HTMLDivElement, Record<string, never>>((_, ref) => {
  const { t } = useTranslation();
  const [lang, setLang] = useState("it");

  return (
    <SideBar ref={ref} >
      <SideBarItem
        text={t("navbar-button1")}
        icon={<HomeRoundedIcon />}
        href="/#home"
        onClick={() => window.location.href = "/#home"}
      />
      <SideBarItem
        text={t("navbar-button2")}
        icon={<DesignServicesRoundedIcon />}
        href="/#services"
        onClick={() => window.location.href = "/#services"}
      />
      <SideBarItem
        text={t("navbar-button3")}
        icon={<AssignmentTurnedInRoundedIcon />}
        href="/#projects"
        onClick={() => window.location.href = "/#projects"}
      />
      <SideBarItem
        text={t("language-button")}
        icon={<PublicRoundedIcon />}
        onClick={() => {
          setLang(lang === "it" ? "en" : "it");
        }}
      />
      <SideBarItem
        text={t("navbar-button5")}
        icon={<LocalPhoneRoundedIcon />}
        href="/#contacts"
        onClick={() => window.location.href = "/#contacts"}
      />
    </SideBar>
  );
})

export default WebionSideBar
