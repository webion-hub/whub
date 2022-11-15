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
import { AppContext } from '@whub/apis-react';

const contactUs = new ContactUsApi({
  baseUrl: 'http://localhost:5181/contactus', //'https://webion.it/contactus',
  withCredentials: true,
});

AppContext.contactUs = {
  api: contactUs,
};

function CustomApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import('react-facebook-pixel')
      .then((m) => m.default)
      .then((r) => r.init('592480175654211'));
  }, []);

  // (function (m, e, t, r, i, k, a) {
  //   m[i] =
  //     m[i] ||
  //     function () {
  //       (m[i].a = m[i].a || []).push(arguments);
  //     };
  //   m[i].l = 1 * new Date();
  //   for (var j = 0; j < document.scripts.length; j++) {
  //     if (document.scripts[j].src === r) {
  //       return;
  //     }
  //   }
  //   (k = e.createElement(t)),
  //     (a = e.getElementsByTagName(t)[0]),
  //     (k.async = 1),
  //     (k.src = r),
  //     a.parentNode.insertBefore(k, a);
  // })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

  // ym(90356482, 'init', {
  //   clickmap: true,
  //   trackLinks: true,
  //   accurateTrackBounce: true,
  //   webvisor: true,
  // });
  // <noscript>
  //   <div>
  //     <img
  //       src="https://mc.yandex.ru/watch/90356482"
  //       style="position:absolute; left:-9999px;"
  //       alt=""
  //     />
  //   </div>
  // </noscript>;
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="assets/favicon.ico" />
        <title>Webion</title>
      </Head>
      <main className="app">
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
              sx={{ marginTop: 0 }}
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
      </main>
    </>
  );
}

export default CustomApp;
