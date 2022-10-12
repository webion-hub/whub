import {
  ChildrenProps,
  FlagLanguageDropdown,
  Footer,
  FooterBottomLabel,
  FooterColumn,
  FooterContent,
  FooterRow,
  Img,
  NextImg,
  useLanguage,
  useNextNavigator,
} from '@whub/wui';

import {
  Grid,
  IconButton,
  Link,
  LinkProps,
  Stack,
  Typography,
  TypographyProps,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Facebook, YouTube } from '@mui/icons-material';
import { homeCatergoryUrls } from '../category-routes.config';

const FooterLinkTitle = (props: TypographyProps) => (
  <Typography variant="h6" marginBottom={1} component="p">
    {props.children}
  </Typography>
);

const FooterLink = (props: LinkProps) => (
  <Link
    underline="hover"
    variant="body2"
    color={(theme) => theme.palette.text.secondary}
    sx={{ width: 'fit-content' }}
    {...props}
  >
    {props.children}
  </Link>
);

const LinksFooterColumn = (props: ChildrenProps) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <FooterColumn
      showBorder={!isMd}
      spacing={2}
      alignItems={{ xs: 'center', md: 'flex-start' }}
      sx={{
        paddingLeft: { xs: 0, md: 6 },
        width: '100%',
        '& > *': {
          textAlign: { xs: 'center', md: 'left' },
        },
      }}
    >
      {props.children}
    </FooterColumn>
  );
};

export default function SimmFooter() {
  const { clickNavigate } = useNextNavigator();
  const { t } = useLanguage();

  return (
    <Footer>
      <FooterContent>
        <FooterColumn
          width="40%"
          alignItems={{ xs: 'center', md: 'flex-start' }}
        >
          <NextImg
            auto
            width="100%"
            sx={{ maxWidth: 300 }}
            alt="full logo"
            src="/assets/images/full-logo.webp"
          />
          <Typography variant="body2" textAlign={{ xs: 'center', md: 'left' }}>
            {t('company-name')}
          </Typography>
          <Typography variant="body2" textAlign={{ xs: 'center', md: 'left' }}>
            {t('p-iva')}
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent={{ xs: 'center', md: 'flex-start' }}
            sx={{
              marginTop: (theme) => theme.spacing(3, '!important'),
            }}
          >
            <IconButton
              color="primary"
              target="_blank"
              href="https://www.facebook.com/simmimballaggi/"
              aria-label="facebook icon"
            >
              <Facebook />
            </IconButton>
            <IconButton
              color="primary"
              target="_blank"
              aria-label="youtube icon"
              href="https://www.youtube.com/channel/UCNawmda-zHQCIeh20N5nslg"
            >
              <YouTube />
            </IconButton>
            <FlagLanguageDropdown />
          </Grid>
        </FooterColumn>
        <FooterRow height={225} width="60%" spacing={{ xs: 5, md: 0 }}>
          <LinksFooterColumn>
            <FooterLinkTitle>{t('company')}</FooterLinkTitle>
            <FooterLink href="/#home" onClick={clickNavigate('/#home')}>
              {t('home')}
            </FooterLink>
            <FooterLink
              href="/#chi-siamo"
              onClick={clickNavigate('/#chi-siamo')}
            >
              {t('who-are-we')}
            </FooterLink>
          </LinksFooterColumn>
          <LinksFooterColumn>
            <FooterLinkTitle>{t('products')}</FooterLinkTitle>
            <FooterLink
              href={homeCatergoryUrls.materials}
              onClick={clickNavigate(homeCatergoryUrls.materials)}
            >
              {t('materials')}
            </FooterLink>
            <FooterLink
              href={homeCatergoryUrls.machines}
              onClick={clickNavigate(homeCatergoryUrls.machines)}
            >
              {t('machines')}
            </FooterLink>
          </LinksFooterColumn>
          <LinksFooterColumn>
            <FooterLinkTitle>{t('contacts')}</FooterLinkTitle>
            <FooterLink href="mailto:info@simmimballaggi.com">
              {t('email')}: {t('email-link')}
            </FooterLink>
            <FooterLink href="tel:051 800 960">
              {t('telephone')}: {t('telephone-link')}
            </FooterLink>
            <FooterLink
              target="_blank"
              href="https://www.google.com/maps?ll=44.535115,11.413146&z=16&t=m&hl=it&gl=IT&mapclient=embed&q=Via+Gian+Luigi+Lazzari,+18+40057+Quarto+Inferiore+BO"
            >
              {t('address-link')}
            </FooterLink>
          </LinksFooterColumn>
        </FooterRow>
      </FooterContent>
      <FooterBottomLabel
        DividerSx={{
          width: '100%',
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
          },
        }}
      >
        <FooterLink variant="caption" href="https://webion.it/" target="_blank">
          {t('powered-by-webion')}
        </FooterLink>
        <Stack direction="row" spacing={2}>
          <FooterLink variant="caption" href="/privacy" target="_blank">
            {t('policies')}
          </FooterLink>
          <Typography variant="caption">{t('copyright')}</Typography>
        </Stack>
      </FooterBottomLabel>
    </Footer>
  );
}
