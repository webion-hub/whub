import { Button, Grid, IconButton, Link, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";
import React from "react";
import { FooterColumn } from "./FooterLayout";
import { FooterContent } from "./FooterContent";
import { Footer } from "./Footer";
import { FooterBottomLabel } from "./FooterBottomLabel";

export interface WuiFooterSocialProps {
  readonly href: string,
  readonly icon: any,
}

export interface WuiFooterButtonProps {
  readonly text: string,
  readonly href?: string,
  readonly onClick?: any,
}

export interface WuiFooterSectionProps {
  readonly title: string,
  readonly buttons: WuiFooterButtonProps[],
}

export interface WuiFooterProps {
  readonly sectionsProps: WuiFooterSectionProps[],
  readonly showSocials?: boolean,
  readonly socialsProps: WuiFooterSocialProps[],
  readonly privacyLink?: string,
  readonly extraText?: string,
  readonly mailLink?: string,
}

export const WuiFooter = React.forwardRef<HTMLDivElement, WuiFooterProps>((props, ref) => {
  const { t } = useTranslation();

  const createButtons = (el: WuiFooterSectionProps) => {
    const elements: any = []
    el.buttons.map((btn: WuiFooterButtonProps, i: number) => (
      elements.push(
        <Button
          color="info"
          href={btn.href?? ""}
          key={i}
          onClick={btn.onClick}
          sx={{
            alignSelf: "auto",
            width: "fit-content",
            minWidth: 0,
            marginLeft: theme => ({
              md: theme.spacing(-1, '!important'),
              xs: 0
            })
          }}
        >
          {btn.text}
        </Button>
      )
    ))
    return elements
  }

  const createSections = () => {
    const elements: any = []
    props.sectionsProps.map((el, i) => (
      elements.push(
        <FooterColumn
          alignItems={{xs:'center', md: "baseline"}}
          sx={{marginBottom: {xs: 4, md: 0}}}
          key={i}
        >
          <Typography variant="subtitle2">
            {el.title}
          </Typography>
          {createButtons(el)}
        </FooterColumn>
      )
    ))
    return elements
  }

  const socialsSection = () => {
    if(!props.showSocials)
      return (null)

    return (
      <FooterColumn
        alignItems={{xs:'center', md: "left"}}
      >
        <Typography variant="subtitle2">
          SOCIAL
        </Typography>
        <Grid
          container
          sx={{justifyContent: "center"}}
        >
          {props.socialsProps.map((el, i) => (
            <IconButton
              size="large"
              href={el.href}
              target="_blank"
              color="primary"
              key={i}
            >
              {el.icon}
            </IconButton>)
          )}
        </Grid>
      </FooterColumn>
    )
  }

  return (
    <Footer ref={ref}>
      <FooterContent>
        {createSections()}
        {socialsSection()}
      </FooterContent>
      <FooterBottomLabel
        TypographyProps={{ variant: "caption" }}
      >
        <Link
          href="/policies-licenses"
          target="_blank"
          sx={{ marginRight: 1 }}
          color="inherit"
        >
          {props.privacyLink}
        </Link>
        <Typography variant="caption">
          {props.extraText}
        </Typography>
        <Link
          sx={{ marginLeft: 1 }}
          color="inherit"
          href={"mailto:" + props.mailLink}
        >
          {props.mailLink}
        </Link>
      </FooterBottomLabel>
    </Footer>
  );
})

WuiFooter.defaultProps = {
  showSocials: true,
  privacyLink: "",
  extraText: "",
  mailLink: "",
}
