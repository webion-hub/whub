import React from "react";
import { useTranslation } from "react-i18next";

import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import { AppbarButtonProps, WuiAppBar } from "@whub/wui";

const SimmAppbar = React.forwardRef<HTMLDivElement, Record<string, never>>((_, ref) => {
  const {t} = useTranslation();

  const buttons : AppbarButtonProps[] = 
  [
    {
      text: t("navbar-button5"),
      href: "/#contacts",
      variant: "text",
      color: "secondary",
      sx: {width: "160px"}
    },
    {
      text: "Log in",
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
      logoURL="assets/images/logo.png"
      logoSx={{ 
        width: 48, 
        height: 48, 
        borderRadius: "100%", 
        marginTop: "-3px", 
        marginRight: 2,
        padding: 1,
      }}
      text=""
      languageComponent={PublicRoundedIcon}
    />
  )
});

export default SimmAppbar
