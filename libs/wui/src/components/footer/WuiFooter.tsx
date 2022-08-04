import { Button, Divider, Grid, IconButton, Link, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";
import React from "react";
import { Footer, FooterBottomLabel, FooterColumn, FooterContent } from "@whub/wui";

export interface FooterSocialProps {
  readonly href: string,
  readonly icon: any,
}

export interface FooterButtonProps {
  readonly text: string,
  readonly href?: string,
  readonly onClick?: any,
}

export interface SectionProps {
  readonly title: string,
  readonly buttons: FooterButtonProps[],
}

export interface WuiFooterProps {
  readonly sectionsProps: SectionProps[],
  readonly showSocials?: boolean,
  readonly socialsProps: FooterSocialProps[],
  readonly privacyLink?: string,
  readonly extraText?: string,
  readonly mailLink?: string,
}

export const WuiFooter = React.forwardRef<HTMLDivElement, WuiFooterProps>((props, ref) => {
  const { t } = useTranslation();

  const createButtons = (el: SectionProps) => {
    const elements: any = []
    el.buttons.map((btn: FooterButtonProps, i: number) => (
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
              sm: theme.spacing(-1, '!important'), 
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
        <FooterColumn StackProps={{ alignItems: {xs:'center', md: "baseline"}}} key={i}>
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
      return (<></>)

    return (
      <FooterColumn 
        StackProps={{ 
          alignItems: {xs:'center', md: "left"}, 
        }} 
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
      <Divider sx={{ width: "90%", margin: 'auto' }}/>
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
        <>{props.extraText}</>
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
