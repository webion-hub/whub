import {
  EmailRounded,
  Facebook,
  GitHub,
  Instagram,
  LinkedIn,
  PhoneRounded,
} from '@mui/icons-material';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { ContactUsApi } from '@whub/apis-contactus';
import { ApiWrapper } from '@whub/apis-react';
import {
  CookiePopup,
  LanguageWrapper,
  Layout,
  SpeedDial,
  ThemeWrapper,
} from '@whub/wui';
import { GB, IT } from 'country-flag-icons/react/3x2';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import en from '../public/assets/locales/en-EN.json';
import it from '../public/assets/locales/it-IT.json';
import WebionAppbar from '../components/layout/WebionAppBar';
import WebionFooter from '../components/layout/WebionFooter';
import WebionSideBar from '../components/layout/WebionSideBar';
import { WebionRepository } from '../lib/WebionRepositiory';
import globalStyle from '../theme/globalStyle';
import './styles.css';
import { darkTheme, lightTheme } from '../theme/getTheme';

const contactUs = new ContactUsApi({
  baseUrl: 'http://localhost:5181/contactus', //'https://webion.it/contactus',
  withCredentials: true,
});

function CustomApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import('react-facebook-pixel')
      .then((m) => m.default)
      .then((r) => r.init('592480175654211'));
  }, []);

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="assets/favicon.ico" />
        <title>Webion</title>
      </Head>
      <main className="app">
        <ApiWrapper
          apis={{
            contactUs: { api: contactUs },
          }}
        >
          <LanguageWrapper
            availableLanguages={{
              it: { flag: IT, translation: it },
              en: { flag: GB, translation: en },
            }}
          >
            <ThemeWrapper
              themes={{
                dark: darkTheme,
                light: lightTheme,
              }}
            >
              <CssBaseline />
              <GlobalStyles styles={globalStyle} />
              <CookiePopup
                usePixel
                name="webion"
                privacyUrl="/policies-licenses"
              />
              <Layout
                AppBarComponent={<WebionAppbar />}
                FooterComponent={<WebionFooter />}
                SidebarComponent={<WebionSideBar />}
              >
                <Component {...pageProps} />
              </Layout>
              <SpeedDial
                actions={[
                  {
                    name: 'Email',
                    Icon: EmailRounded,
                    onClick: WebionRepository.openEmail,
                  },
                  {
                    name: 'Telefono',
                    Icon: PhoneRounded,
                    onClick: WebionRepository.openPhone,
                  },
                  {
                    name: 'GitHub',
                    Icon: GitHub,
                    onClick: WebionRepository.openGithub,
                  },
                  {
                    name: 'Instagram',
                    Icon: Instagram,
                    onClick: WebionRepository.openInstagram,
                  },
                  {
                    name: 'Facebook',
                    Icon: Facebook,
                    onClick: WebionRepository.openFacebook,
                  },
                  {
                    name: 'Linkedin',
                    Icon: LinkedIn,
                    onClick: WebionRepository.openLinkedin,
                  },
                ]}
              />
            </ThemeWrapper>
          </LanguageWrapper>
        </ApiWrapper>
      </main>
    </>
  );
}

export default CustomApp;
