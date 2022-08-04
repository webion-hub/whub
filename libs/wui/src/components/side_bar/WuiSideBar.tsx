import { useTranslation } from "react-i18next";
import React from "react";

import { SideBar, SideBarItem, useLanguage } from "@whub/wui";
import { SxProps } from "@mui/material";
import { Theme } from "@mui/system";

import PublicRoundedIcon from "@mui/icons-material/PublicRounded";

export interface SidebarButtonProps {
  readonly text: string,
  readonly icon: any,
  readonly href?: string,   
  readonly onClick?: any,
  readonly sx?: SxProps<Theme>,
  readonly afterLanguage?: boolean,
}

export interface WuiSideBarProps {
  readonly buttonsProps: SidebarButtonProps[],
  readonly showLanguageButton?: boolean,
  readonly languageComponent?: any,
}

export const WuiSideBar = React.forwardRef<HTMLDivElement, WuiSideBarProps>((props, ref) => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  const languageButton = () => {
    if(!props.showLanguageButton)
      return (<></>)

    return (
      <SideBarItem
        text={t("language-button")}
        icon={<props.languageComponent />}
        onClick={() => {
          setLanguage(language === "it" ? "en" : "it");
        }}
      />
    )
  }

  const createButtons = (afterLanguage: boolean) => {
    const elements: any = []
    props.buttonsProps.map((el, i) => {
      if(afterLanguage === (el.afterLanguage ?? false))
        elements.push(
          <SideBarItem
            key={i}
            text={el.text}
            icon={<el.icon/>}
            href={el.href}
            sx={el.sx}
            onClick={el.onClick ?? (() => {
              window.location.href = (el.href ?? "")
            })}
          />
        )
    })
    return elements
  }

  return (
    <SideBar ref={ref} >
      {createButtons(false)}
      {languageButton()}
      {createButtons(true)}
    </SideBar>
  );
})

WuiSideBar.defaultProps = {
  showLanguageButton: true,
  languageComponent: PublicRoundedIcon,
}