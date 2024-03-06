import PublicRounded from '@mui/icons-material/PublicRounded';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material';
import BasicThemeButton from '@wui/components/BasicThemeButton';
import LanguageDropdownButton from '@wui/components/LanguageDropdownButton';
import { useNextNavigator } from '@wui/core';
import { useLayout } from '@wui/layout';
import { AppBarContent, AppBarSection } from '@wui/layout/AppBar';
import { SideBarButton } from '@wui/layout/Sidebar';
import useLanguage from '@wui/wrappers/useLanguage';
import { AppBarContainer } from './AppBarContainer';
import { AppBarLogo } from './AppBarLogo';
import { ServicesButton } from './ServicesButton';

export default function WebionAppbar() {
  const { t } = useLanguage();
  const theme = useTheme();
  const { clickNavigate } = useNextNavigator();
  const { currentSection } = useLayout();

  const isHome = currentSection === 'home';

  return (
    <AppBarContainer>
      <AppBarContent>
        <AppBarSection alignment="start">
          <AppBarLogo/>
        </AppBarSection>
        <AppBarSection
          alignment="end"
          isVisible={{ xs: false, lg: true }}
          spacing={3}
          sx={{
            '& > *': {
              width: 'max-content',
            },
            '& .MuiSvgIcon-root': {
              color: (theme) =>
                isHome ? '#fff' : theme.palette.text.primary,
            },
          }}
        >
          <ServicesButton />

          <Button
            color="inherit"
            href="/techs"
            onClick={clickNavigate('/techs')}
          >
            {t('navbar-button5')}
          </Button>
          <Button
            color="inherit"
            href="/blog"
            onClick={clickNavigate('/blog')}
          >
            {t('navbar-button6')}
          </Button>
          <Button
            color="inherit"
            href="/who-we-are"
            onClick={clickNavigate('/who-we-are')}
          >
            {t('navbar-button4')}
          </Button>
          <Button
            color="inherit"
            href="/work-with-us"
            onClick={clickNavigate('/work-with-us')}
          >
            {t('navbar-button7')}
          </Button>
          <LanguageDropdownButton icon={PublicRounded} />
          <BasicThemeButton />
          <Button
            variant="contained"
            color="primary"
            href="/contact-us"
            onClick={clickNavigate('/contact-us')}
          >
            {t('contact-us')}
          </Button>
        </AppBarSection>
        <AppBarSection
          alignment="end"
          isVisible={{ xs: true, lg: false }}
        >
          <SideBarButton color="inherit">
            <svg
              width="24"
              height="24"
              viewBox="0 0 40 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="menu button"
            >
              <path
                d="M6.28571 8.00044H17.7143C18.3205 8.00044 18.9019 8.24276 19.3305 8.6741C19.7592 9.10543 20 9.69044 20 10.3004C20 10.9104 19.7592 11.4955 19.3305 11.9268C18.9019 12.3581 18.3205 12.6004 17.7143 12.6004H6.28571C5.67951 12.6004 5.09812 12.3581 4.66947 11.9268C4.24082 11.4955 4 10.9104 4 10.3004C4 9.69044 4.24082 9.10543 4.66947 8.6741C5.09812 8.24276 5.67951 8.00044 6.28571 8.00044V8.00044ZM22.2857 26.4004H33.7143C34.3205 26.4004 34.9019 26.6428 35.3305 27.0741C35.7592 27.5054 36 28.0904 36 28.7004C36 29.3104 35.7592 29.8955 35.3305 30.3268C34.9019 30.7581 34.3205 31.0004 33.7143 31.0004H22.2857C21.6795 31.0004 21.0981 30.7581 20.6695 30.3268C20.2408 29.8955 20 29.3104 20 28.7004C20 28.0904 20.2408 27.5054 20.6695 27.0741C21.0981 26.6428 21.6795 26.4004 22.2857 26.4004ZM6.28571 17.2004H33.7143C34.3205 17.2004 34.9019 17.4428 35.3305 17.8741C35.7592 18.3054 36 18.8904 36 19.5004C36 20.1104 35.7592 20.6955 35.3305 21.1268C34.9019 21.5581 34.3205 21.8004 33.7143 21.8004H6.28571C5.67951 21.8004 5.09812 21.5581 4.66947 21.1268C4.24082 20.6955 4 20.1104 4 19.5004C4 18.8904 4.24082 18.3054 4.66947 17.8741C5.09812 17.4428 5.67951 17.2004 6.28571 17.2004V17.2004Z"
                fill={isHome ? '#fff' : theme.palette.text.primary}
                fillOpacity="0.84"
              />
            </svg>
          </SideBarButton>
        </AppBarSection>
      </AppBarContent>
    </AppBarContainer>
  );
}