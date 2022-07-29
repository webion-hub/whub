import React from "react";
import { useTranslation } from "react-i18next";

import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import OthersDropdownButton from "../dropdown/OthersDropdownButton";
import { AppbarButtonProps, WuiAppBar } from "@whub/wui";

const WebionAppbar = React.forwardRef<HTMLDivElement, Record<string, never>>((_, ref) => {
  const {t} = useTranslation();

  const buttons : AppbarButtonProps[] = 
  [
    {
      text: t("navbar-button2"),
      href: "/#services",
      color: "inherit",
    },
    {
      text: t("navbar-button3"),
      href: "/#projects",
      color: "inherit",
    },
    {
      text: t("navbar-button5"),
      href: "/#contacts",
      variant: "contained",
      color: "secondary",
      afterLanguage: true,
      sx: {width: "160px"}
    },
  ]
  return (
    <WuiAppBar 
      ref={ref}
      page="Webion"
      showLanguageButton={true}
      showDropdownButton={false}
      buttonsProps={buttons}
      logoURL="assets/images/logoTransparentBackground.svg"
      logoSx={{ 
        width: 48, 
        height: 48, 
        borderRadius: "100%", 
        marginTop: "-3px", 
        marginRight: 2,
        padding: 1
      }}
      text="Webion"
      languageComponent={PublicRoundedIcon} 
      dropdownComponent={OthersDropdownButton}
    />
  )
});

export default WebionAppbar
