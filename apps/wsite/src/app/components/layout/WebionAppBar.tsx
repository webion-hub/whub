import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import OthersDropdownButton from "../dropdown/OthersDropdownButton";
import { AppbarButtonProps, WuiAppBar } from "@whub/wui";
import { alpha, SxProps, useTheme } from "@mui/material";
import { Theme } from "@mui/system";
const WebionAppbar = React.forwardRef<HTMLDivElement, Record<string, never>>((_, ref) => {

  const {t} = useTranslation();
  const theme = useTheme()

  const appbarColor =
    theme.palette.layout?.appbar ??
    theme.palette.primary.main

  const initialState = useMemo<SxProps<Theme>>(() => ({
    background: alpha(appbarColor, 0),
    transform: `translateY(0px)`,
    backdropFilter: 'blur(0px)',
    "::after" : {
      content: '""',
      width: '100%',
      height: "1px",
      background: theme.palette.grey[700],
      margin: "auto",
      transition: `${theme.transitions.duration.enteringScreen}ms transform ease-in-out`,
      transform: `scaleX(0%)`
    },
  }), [appbarColor])

  const finalState = useMemo<SxProps<Theme>>(() => ({
    background: alpha(appbarColor, 0.7),
    transform: `translateY(-16px)`,
    backdropFilter: 'blur(16px)',
    "::after" : {
      content: '""',
      width: '100%',
      height: "1px",
      background: theme.palette.grey[700],
      margin: "auto",
      transition: `${theme.transitions.duration.enteringScreen}ms transform ease-in-out`,
      transform: `scaleX(100%)`
    },
  }), [appbarColor])



  const buttons : AppbarButtonProps[] =
  [
    {
      text: t("navbar-button2"),
      href: "/#services",
      color: "inherit",
      sx: {
        color: theme.palette.text.secondary,
      }
    },
    {
      text: t("navbar-button3"),
      href: "/#projects",
      color: "inherit",
      sx: {
        color: theme.palette.text.secondary,
      }
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
      scrollPos={200}
      initialSx={initialState}
      finalSx={finalState}
      sx={{
        backgroundImage: "none",
        transition: `
          ${theme.transitions.duration.enteringScreen}ms background-color ease-in-out,
          ${theme.transitions.duration.enteringScreen}ms transform ease-in-out
        `,
        paddingTop: 2,
        boxShadow: "none",
      }}
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
      DropdownComponent={OthersDropdownButton}
    />
  )
});

export default WebionAppbar
