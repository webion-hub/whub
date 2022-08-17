import { Button, ButtonBase, Grid,  SxProps, Typography } from "@mui/material";

import { AppBar } from "./AppBar";
import { AppBarContent } from "./AppBarContent";
import { AppBarSection } from "./AppBarSection";
import { useTranslation } from "react-i18next";

import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";

import { useSidebar } from "../../hooks/useSideBar";
import { Img } from "../Img";
import React, { useEffect, useState } from "react";
import { SideBarButton } from "../side_bar/SidebarButton";
import { Theme } from "@mui/system";
import { useScroll } from "../../hooks/useScroll";
import { LanguageDropdownButton } from "../LanguageDropdown";

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
  readonly initialSx?: SxProps<Theme>,
  readonly finalSx?: SxProps<Theme>,
  readonly scrollPos?: number,
  readonly sx?: SxProps<Theme>,
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

export const WuiAppBar = React.forwardRef<HTMLDivElement, WuiAppBarProps>((props, ref) => {
  const { t } = useTranslation();
  const { isSideBarOpen } = useSidebar();
  const [appBarOpt, setAppBarOpt] = useState<SxProps<Theme>>(props.initialSx ?? {})
  const { isArrived } = useScroll(props.scrollPos ?? 0);

  useEffect(() => {
    const state = isArrived
      ? props.finalSx
      : props.initialSx

    setAppBarOpt(state ?? {})
  }, [isArrived, props])

  const languageButton = () => {
    if(!props.showLanguageButton)
      return (null)

    return (
      props.LanguageComponent
    )
  }

  const searchBar = () => {
    if(!props.showSearchbar)
      return (<></>)

    return (
      props.SearchbarComponent
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

  const sx = {
    ...appBarOpt,
    ...props.sx
  }

  return (
    <AppBar
      ref={ref}
      sx={sx}
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
              color="textSecondary"
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
        >
          {searchBar()}
        </AppBarSection>

        <AppBarSection
          alignment="end"
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
          <SideBarButton
            visible={isSideBarOpen}
          >
            <svg width="24" height="24" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.28571 8.00044H17.7143C18.3205 8.00044 18.9019 8.24276 19.3305 8.6741C19.7592 9.10543 20 9.69044 20 10.3004C20 10.9104 19.7592 11.4955 19.3305 11.9268C18.9019 12.3581 18.3205 12.6004 17.7143 12.6004H6.28571C5.67951 12.6004 5.09812 12.3581 4.66947 11.9268C4.24082 11.4955 4 10.9104 4 10.3004C4 9.69044 4.24082 9.10543 4.66947 8.6741C5.09812 8.24276 5.67951 8.00044 6.28571 8.00044V8.00044ZM22.2857 26.4004H33.7143C34.3205 26.4004 34.9019 26.6428 35.3305 27.0741C35.7592 27.5054 36 28.0904 36 28.7004C36 29.3104 35.7592 29.8955 35.3305 30.3268C34.9019 30.7581 34.3205 31.0004 33.7143 31.0004H22.2857C21.6795 31.0004 21.0981 30.7581 20.6695 30.3268C20.2408 29.8955 20 29.3104 20 28.7004C20 28.0904 20.2408 27.5054 20.6695 27.0741C21.0981 26.6428 21.6795 26.4004 22.2857 26.4004ZM6.28571 17.2004H33.7143C34.3205 17.2004 34.9019 17.4428 35.3305 17.8741C35.7592 18.3054 36 18.8904 36 19.5004C36 20.1104 35.7592 20.6955 35.3305 21.1268C34.9019 21.5581 34.3205 21.8004 33.7143 21.8004H6.28571C5.67951 21.8004 5.09812 21.5581 4.66947 21.1268C4.24082 20.6955 4 20.1104 4 19.5004C4 18.8904 4.24082 18.3054 4.66947 17.8741C5.09812 17.4428 5.67951 17.2004 6.28571 17.2004V17.2004Z" fill="white" fillOpacity="0.84"/>
            </svg>
          </SideBarButton>
        </AppBarSection>
      </AppBarContent>
    </AppBar>
  );
});

WuiAppBar.defaultProps = {
  showLanguageButton: true,
  showDropdownButton: true,
  showSearchbar: false,
  LanguageComponent: <LanguageDropdownButton icon={PublicRoundedIcon}></LanguageDropdownButton>,
}
