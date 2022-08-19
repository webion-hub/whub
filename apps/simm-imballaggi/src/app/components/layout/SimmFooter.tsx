import { ChildrenProps, FlagLanguageDropdown, Footer, FooterBottomLabel, FooterColumn, FooterContent, FooterRow, Img, LanguageDropdownButton } from "@whub/wui";
import { useTranslation } from "react-i18next";
import { Grid, IconButton, Link, LinkProps, Stack, Typography, TypographyProps, useMediaQuery, useTheme } from "@mui/material";
import { Facebook, YouTube } from "@mui/icons-material";

const FooterLinkTitle = (props: TypographyProps) => (
  <Typography
    variant="h6"
    marginBottom={1}
    {...props}
  >
    {props.children}
  </Typography>
)

const FooterLink = (props: LinkProps) => (
  <Link
    underline="hover"
    variant="body2"
    color={theme => theme.palette.text.secondary}
    sx={{ width: 'fit-content' }}
    {...props}
  >
    {props.children}
  </Link>
)

const LinksFooterColumn = (props: ChildrenProps) => {
  const theme = useTheme()
  const isMd = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <FooterColumn
      showBorder={!isMd}
      spacing={2}
      alignItems={{xs: 'center', md: 'flex-start'}}
      sx={{
        paddingLeft: {xs: 0, md: 6},
        width: "100%",
        "& > *": {
          textAlign: {xs: 'center', md: 'left'}
        }
      }}
    >
      {props.children}
    </FooterColumn>
  )
}

export default function SimmFooter() {
  const { t } = useTranslation(); 
  return(
    <Footer maxWidth={1600}>
      <FooterContent>
        <FooterColumn
          width="40%"
          alignItems={{xs: 'center', md: 'flex-start'}}
        >
          <Img
            sx={{ width: '100%', maxWidth: 300 }}
            src="assets/images/full-logo.png"
          />
          <Typography
            variant="body2"
            textAlign={{xs: 'center', md: 'left'}}
          >
            {t("company-name")}
          </Typography>
          <Typography
            variant="body2"
            textAlign={{xs: 'center', md: 'left'}}
          >
            {t("p-iva")}
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent={{xs: 'center', md: 'flex-start'}}
            sx={{
              marginTop: theme => theme.spacing(3, '!important')
            }}
          >
            <IconButton
              color="primary"
            >
              <Facebook/>
            </IconButton>
            <IconButton
              color="primary"
            >
              <YouTube/>
            </IconButton>
            <FlagLanguageDropdown/>
          </Grid>
        </FooterColumn>
        <FooterRow
          height={225}
          width="60%"
          spacing={{xs: 5, md: 0}}
        >
          <LinksFooterColumn>
            <FooterLinkTitle>
            {t("company")}
            </FooterLinkTitle>
            <FooterLink href="#"> {t("home")} </FooterLink>
            <FooterLink href="#"> {t("who-are-we")} </FooterLink>
          </LinksFooterColumn>
          <LinksFooterColumn>
            <FooterLinkTitle>
            {t("products")}
            </FooterLinkTitle>
            <FooterLink href="#"> {t("machines")} </FooterLink>
            <FooterLink href="#"> {t("materials")} </FooterLink>
          </LinksFooterColumn>
          <LinksFooterColumn>
            <FooterLinkTitle>
            {t("contacts")}
            </FooterLinkTitle>
            <FooterLink href="#"> {t("email")}: {t("email-link")} </FooterLink>
            <FooterLink href="#"> {t("telephone")}: {t("telephone-link")} </FooterLink>
            <FooterLink href="#"> {t("fax")}: {t("fax-link")}</FooterLink>
            <FooterLink href="#"> {t("address-link")} </FooterLink>
          </LinksFooterColumn>
        </FooterRow>
      </FooterContent>
      <FooterBottomLabel
        DividerSx={{
          width: '100%'
        }}
        StackProps={{
          direction: { xs: 'column-reverse', md: 'row' },
          justifyContent: 'space-between',
        }}
        TypographyProps={{
          variant: 'caption',
          sx: {
            width: '100%',
            margin: '0 auto',
          }
        }}
      >
        <FooterLink href='#' variant="caption">
        {t("powered-by-webion")}
        </FooterLink>
        <Stack
          direction="row"
          spacing={2}
        >
          <FooterLink href='#' variant="caption">
          {t("policies")}
          </FooterLink>
          <FooterLink href='#' variant="caption">
          {t("copyright")}
          </FooterLink>
        </Stack>
      </FooterBottomLabel>
    </Footer>
  )
}
