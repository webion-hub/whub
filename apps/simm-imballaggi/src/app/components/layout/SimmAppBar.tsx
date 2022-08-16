import React from "react";
import { useTranslation } from "react-i18next";

import { AppbarButtonProps, WuiAppBar, CategorySearchBar } from "@whub/wui";
import FlagLanguageDropdown from "../dropdown/FlagLanguageDropdown";

const SimmAppbar = React.forwardRef<HTMLDivElement, Record<string, never>>((_, ref) => {
  const {t} = useTranslation();

  const buttons : AppbarButtonProps[] =
  [
    {
      text: t("navbar-button5"),
      href: "/contacts",
      variant: "text",
      color: "secondary",
      sx: {width: "160px"}
    },
    {
      text: "Log in",
      href: "/#contacts",
      variant: "contained",
      color: "primary",
      afterLanguage: true,
      sx: {width: "160px"}
    },
  ]
  return (
    <WuiAppBar
      ref={ref}
      showLanguageButton
      page="Simm"
      showDropdownButton={false}
      showSearchbar
      buttonsProps={buttons}
      logoURL="assets/images/logo.png"
      logoSx={{
        width: 48,
        height: 48,
        borderRadius: "100%",
        marginTop: -1,
        marginRight: 2,
        padding: 1,
      }}
      text=""
      LanguageComponent={<FlagLanguageDropdown/>}
      SearchbarComponent={
        <CategorySearchBar
          filter="Categoria"
          elements={[
            "Macchine",
            "Reggiatrici",
            "Film",
          ]}
        />}
    />
  )
});

export default SimmAppbar
