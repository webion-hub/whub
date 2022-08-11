import { Button, ButtonBase, Grid, SxProps, Theme, Typography } from "@mui/material";
import { SideBarButton } from "../side_bar/SidebarButton";

import { AppBar } from "./AppBar";
import { AppBarContent } from "./AppBarContent";
import { AppBarSection } from "./AppBarSection";
import { useTranslation } from "react-i18next";

import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";

import { useState, useEffect, useMemo } from "react";
import { useSidebar } from "../../hooks/useSideBar";
import { Img } from "../Img";
import React from "react";
import { useTheme, alpha } from "@mui/material";
import { useScroll } from "../../hooks/useScroll";
import LanguageDropdownButton from "./LanguageDropdown";
import CategorySearchBar from "../search_bar/CategorySearchBar";

export interface AppbarButtonProps {
  readonly text: string,
  readonly color?: "inherit" | "secondary" | "primary" | "success" | "error" | "info" | "warning" | undefined,
  readonly variant?: "text" | "contained" | "outlined" | undefined,
  readonly href?: string,
  readonly onClick?: React.MouseEventHandler<HTMLButtonElement>,
  readonly sx?: SxProps<Theme>,
  readonly afterLanguage?: boolean,
}

export interface WuiAppBarProps {
  readonly page: string,
  readonly logoURL: string,
  readonly logoSx?: SxProps<Theme>,
  readonly text: string,
  readonly subText?: string,
  readonly showLanguageButton?: boolean,
  readonly showDropdownButton?: boolean,
  readonly showSearchbar?: boolean,
  readonly buttonsProps: AppbarButtonProps[],
  readonly SearchbarComponent?: any,
  readonly LanguageComponent?: any,
  readonly DropdownComponent?: any,
}

export interface AppBarOptions {
  readonly background: string,
  readonly dividerLength: number,
  readonly topPosition: number,
  readonly blur: string,
}

export const WuiAppBar = React.forwardRef<HTMLDivElement, WuiAppBarProps>((props, ref) => {
  const { t } = useTranslation();
  const theme = useTheme()
  const appbarColor =
    theme.palette.layout?.appbar ??
    theme.palette.primary.main

  const initialState = useMemo<AppBarOptions>(() => ({
    background: alpha(appbarColor, 0),
    dividerLength: 0,
    topPosition: 0,
    blur: 'blur(0px)',
  }), [appbarColor])

  const finalState = useMemo<AppBarOptions>(() => ({
    background: alpha(appbarColor, 0.7),
    dividerLength: 100,
    topPosition: -16,
    blur: 'blur(16px)',
  }), [appbarColor])


  const [appBarOpt, setAppBarOpt] = useState<AppBarOptions>(initialState)

  const { isSideBarOpen } = useSidebar();
  const { isArrived } = useScroll(200);


  useEffect(() => {
    const state = isArrived
      ? finalState
      : initialState

    setAppBarOpt(state)
  }, [isArrived, finalState, initialState])

  const languageButton = () => {
    if(!props.showLanguageButton)
      return (null)

    return (
      <LanguageDropdownButton
        icon={props.LanguageComponent}
      />
    )
  }
  
  const searchBar = () => {
    if(!props.showSearchbar)
      return (<></>)

    return (
      <props.SearchbarComponent/>
    )
  }

  const dropdowButton = () => {
    if(!props.showDropdownButton)
      return (null)

    if(!props.DropdownComponent)
      return(<>Dropdown</>)

    return (
      <props.DropdownComponent
        icon={ExpandMoreRoundedIcon}
        text={t("navbar-button4")}
        page={props.page}
      />
    )
  }

  return (
    <AppBar
      ref={ref}
      sx={{
        backgroundImage: "none",
        backgroundColor: appBarOpt.background,
        transition: `
          ${theme.transitions.duration.enteringScreen}ms background-color ease-in-out,
          ${theme.transitions.duration.enteringScreen}ms transform ease-in-out
        `,
        transform: `translateY(${appBarOpt.topPosition}px)`,
        backdropFilter: appBarOpt.blur,
        paddingTop: 2,
        boxShadow: "none",
        "::after" : {
          content: '""',
          width: '100%',
          height: "1px",
          background: theme.palette.grey[700],
          margin: "auto",
          transition: `${theme.transitions.duration.enteringScreen}ms transform ease-in-out`,
          transform: `scaleX(${appBarOpt.dividerLength}%)`
        },
      }}
    >
      <AppBarContent>
        <AppBarSection alignment="start">
          <Grid
            container
            component={ButtonBase}
            wrap="nowrap"
            alignItems="center"
            onClick={() => window.location.href="/#home"}
            sx={{cursor: "pointer"}}
          >
            <Img
              src={props.logoURL}
              sx={props.logoSx}
              alt="logo"
              />
            <Typography
              color="inherit"
            >
              {props.text}
            </Typography>
            <Typography
              color="primary"
              sx={{marginLeft: 1}}
            >
              {props.subText}
            </Typography>
          </Grid>
        </AppBarSection>

        <AppBarSection
          alignment="end"
          StackProps={{ justifyContent: "end" }}
        >
          {searchBar()}
        </AppBarSection>
        
        <AppBarSection
          alignment="end"
          StackProps={{ justifyContent: "flex-end" }}
        >
          <AppBarSection hideOnMobile>
            {props.buttonsProps.map((el, i) => {
              if(!el.afterLanguage)
                return(
                  <Button
                    key={i}
                    color={el.color}
                    variant={el.variant}
                    href={el.href}
                    onClick={el.onClick}
                    sx={el.sx}
                  >
                    {el.text}
                  </Button>
                )
              return(<React.Fragment key={i}/>)
            })}
            {dropdowButton()}
            {languageButton()}
            {props.buttonsProps.map((el, i) => {
              if(el.afterLanguage)
                return(
                  <Button
                    key={i}
                    color={el.color}
                    variant={el.variant}
                    href={el.href}
                    onClick={el.onClick}
                    sx={el.sx}
                  >
                    {el.text}
                  </Button>
                )
                return(<React.Fragment key={i}/>)
            })}
          </AppBarSection>
          <SideBarButton visible={isSideBarOpen} />
        </AppBarSection>
      </AppBarContent>
    </AppBar>
  );
});

WuiAppBar.defaultProps = {
  showLanguageButton: true,
  showDropdownButton: true,
  showSearchbar: false,
  LanguageComponent: PublicRoundedIcon,
  SearchbarComponent: CategorySearchBar,
}
