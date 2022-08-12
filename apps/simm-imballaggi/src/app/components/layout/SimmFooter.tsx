import { Footer, FooterBottomLabel, FooterColumn, FooterColumnProps, FooterContent, Img } from "@whub/wui";

import { Grid, IconButton, Link, LinkProps, Stack, Typography } from "@mui/material";
import { Facebook, YouTube } from "@mui/icons-material";

const FooterLink = (props: LinkProps) => (
  <Link
    {...props}
    underline="hover"
    color={theme => theme.palette.text.secondary}
  >
    {props.children}
  </Link>
)

const LinksFooterColumn = (props: FooterColumnProps) => (
  <FooterColumn
    showBorder
    {...props}
  >
    <Stack
      direction="column"
      spacing={2}
      sx={{ marginLeft: 6, width: "100%" }}
    >
     {props.children}
    </Stack>
  </FooterColumn>
)

export default function SimmFooter() {
  const footerMaxWidth = 1600

  return(
    <Footer>
      <FooterContent
        disableAutoAlign
        width={footerMaxWidth}
      >
        <FooterColumn sx={{ width: "40%" }}>
          <Img
            sx={{ width: '100%', maxWidth: 400 }}
            src="assets/images/full-logo.png"
          />
          <Typography>S.I.M.M. Imballaggi s.r.l.</Typography>
          <Typography>Partita I.V.A./C.F. 02666561200</Typography>
          <Grid
            container
            direction="row"
            sx={{
              marginTop: theme => theme.spacing(6, '!important')
            }}
          >
            <IconButton
              color="primary"
              size="large"
            >
              <Facebook fontSize="large"/>
            </IconButton>
            <IconButton
              color="primary"
              size="large"
            >
              <YouTube fontSize="large"/>
            </IconButton>
          </Grid>
        </FooterColumn>
        <FooterContent disableAutoAlign>
          <LinksFooterColumn>
            <Typography
              variant="h5"
              marginBottom={2}
            >
              Azienda
            </Typography>
            <FooterLink href="#"> Home </FooterLink>
            <FooterLink href="#"> Chi siamo </FooterLink>
          </LinksFooterColumn>
          <LinksFooterColumn>
            <Typography
              variant="h5"
              marginBottom={2}
            >
              Prodotti
            </Typography>
            <FooterLink href="#"> Macchine </FooterLink>
            <FooterLink href="#"> Materiali </FooterLink>
          </LinksFooterColumn>
          <LinksFooterColumn>
            <Typography
              variant="h5"
              marginBottom={2}
            >
              Contatti
            </Typography>
            <FooterLink href="#"> Email: info@simmimballaggi.com </FooterLink>
            <FooterLink href="#"> Tel: 051 800 960 </FooterLink>
            <FooterLink href="#"> Fax: 051 692 6361 </FooterLink>
            <FooterLink href="#"> Via Gian Luigi Lazzari 18, Quarto Inferiore (BO) </FooterLink>
          </LinksFooterColumn>
        </FooterContent>
      </FooterContent>
      <FooterBottomLabel
        DividerSx={{
          width: '100%'
        }}
        StackProps={{
          justifyContent: 'space-between',
        }}
        TypographyProps={{
          variant: 'caption',
          sx: {
            maxWidth: footerMaxWidth,
            width: '100%',
            margin: '0 auto'
          }
        }}
      >
        <FooterLink href='#'>
          Powered by Webion Srl
        </FooterLink>
        <Stack
          direction="row"
          spacing={2}
        >
          <FooterLink href='#'>
            Cookie & Privacy Policy
          </FooterLink>
          <FooterLink href='#'>
            © 2022 | S.I.M.M Imballaggi
          </FooterLink>
        </Stack>
      </FooterBottomLabel>
    </Footer>
  )
}
