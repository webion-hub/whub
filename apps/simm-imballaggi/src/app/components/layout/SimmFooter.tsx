import { ChildrenProps, Footer, FooterBottomLabel, FooterColumn, FooterContent, FooterRow, Img } from "@whub/wui";

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
            S.I.M.M. Imballaggi s.r.l.
          </Typography>
          <Typography
            variant="body2"
            textAlign={{xs: 'center', md: 'left'}}
          >
            Partita I.V.A./C.F. 02666561200
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
          </Grid>
        </FooterColumn>
        <FooterRow
          height={225}
          width="60%"
          spacing={{xs: 5, md: 0}}
        >
          <LinksFooterColumn>
            <FooterLinkTitle>
              Azienda
            </FooterLinkTitle>
            <FooterLink href="#"> Home </FooterLink>
            <FooterLink href="#"> Chi siamo </FooterLink>
          </LinksFooterColumn>
          <LinksFooterColumn>
            <FooterLinkTitle>
              Prodotti
            </FooterLinkTitle>
            <FooterLink href="#"> Macchine </FooterLink>
            <FooterLink href="#"> Materiali </FooterLink>
          </LinksFooterColumn>
          <LinksFooterColumn>
            <FooterLinkTitle>
              Contatti
            </FooterLinkTitle>
            <FooterLink href="#"> Email: info@simmimballaggi.com </FooterLink>
            <FooterLink href="#"> Tel: 051 800 960 </FooterLink>
            <FooterLink href="#"> Fax: 051 692 6361 </FooterLink>
            <FooterLink href="#"> Via Gian Luigi Lazzari 18, <br/> Quarto Inferiore (BO) </FooterLink>
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
          Powered by Webion Srl
        </FooterLink>
        <Stack
          direction="row"
          spacing={2}
        >
          <FooterLink href='#' variant="caption">
            Cookie & Privacy Policy
          </FooterLink>
          <FooterLink href='#' variant="caption">
            © 2022 | S.I.M.M Imballaggi
          </FooterLink>
        </Stack>
      </FooterBottomLabel>
    </Footer>
  )
}
