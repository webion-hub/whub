import { useTranslation } from "react-i18next";
import React from "react";

import { Collapse, List, ListItemButton, ListItemText, SxProps, Theme, useTheme } from "@mui/material";

import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import { SideBarItem } from "./SideBarItem";
import { SideBar } from "./SideBar";
import { useLanguage } from "../../hooks/useLanguage";
import { useSidebar } from "../../hooks/useSideBar";
import { Language } from "../../lib/Language";

export interface SidebarButtonProps {
  readonly text: string,
  readonly icon: any,
  readonly href?: string,
  readonly onClick?: (e: Event) => void,
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
  const { setLanguage } = useLanguage();
  const [ open, setOpen ] = React.useState<boolean>(false);
  const languages = Language.LANGUAGES
  const theme = useTheme()
  const { toggleSidebar } = useSidebar();

  const handleClick = () => {
    setOpen(!open);
  };

  const languageButton = () => {
    if(!props.showLanguageButton)
      return (null)

    return (
      <SideBarItem
        text={t("language-button")}
        icon={<props.languageComponent />}
        stayOpenOnClick
        onClick={handleClick}
      />
    )
  }

  const defaultOnClickIfAbsent = (el: SidebarButtonProps) => {
    return el.onClick ?? (() => {
      window.location.href = (el.href ?? "")
    })
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
            onClick={defaultOnClickIfAbsent(el)}
          />
        )
    })
    return elements
  }

  return (
    <SideBar ref={ref} >
      {createButtons(false)}
      {languageButton()}
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" disablePadding>
          {languages.map((el, i) => {
            return(
              <ListItemButton sx={{ paddingLeft: 4 }} key={i}>
                <ListItemText
                  secondary={t(el)}
                  key={i}
                  secondaryTypographyProps={{color: theme.palette.text.primary}}
                  onClick={() => {
                    setLanguage(el)
                    toggleSidebar()
                  }}
                />
              </ListItemButton>
            )
          })}
        </List>
      </Collapse>
      {createButtons(true)}
    </SideBar>
  );
})

WuiSideBar.defaultProps = {
  showLanguageButton: true,
  languageComponent: PublicRoundedIcon,
}
