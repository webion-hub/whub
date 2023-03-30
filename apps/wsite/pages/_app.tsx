
import en from '../public/assets/locales/en-EN.json';
import it from '../public/assets/locales/it-IT.json';

import Head from "next/head";
import Script from "next/script";
import Layout from "@wui/layout/Layout";

import LanguageWrapper from "@wui/wrappers/Language";
import ThemeWrapper from "@wui/wrappers/Theme";
import { AppProps } from "next/app";

import { darkTheme, lightTheme, globalStyle } from "@wui/theme";

import dynamic from 'next/dynamic';
import { Analytics } from '@vercel/analytics/react';

import BlogContext from '@wapi-ui/blog/BlogContext/BlogContext';
import ContactUsContext from '@wapi-ui/contactus/ContactUsContext/ContactUsContext';

//SPOSTARE IN ImageCropperDialog
//TOGLIERE L'IMPORT DI CROPPER JS DA PACKAGEJSON
import "cropperjs/dist/cropper.css";
import { CookieWrapper } from '@wui/wrappers';


const CookiePopup = dynamic(() => import("@wui/components/CookiePopup"), { ssr: true })
const WebionSpeedDial = dynamic(() => import("../components/others/WebionSpeedDial"), { ssr: true })
const WebionAppBar = dynamic(() => import("../components/layout/WebionAppBar/WebionAppBar"), { ssr: true })
const WebionSideBar = dynamic(() => import("../components/layout/WebionSideBar/WebionSideBar"))
const WebionFooter = dynamic(() => import("../components/layout/WebionFooter/WebionFooter"), { ssr: true })
const CssBaseline = dynamic(() => import("@mui/material/CssBaseline"), { ssr: true })
const GlobalStyles = dynamic(() => import("@mui/material/GlobalStyles"), { ssr: true })

BlogContext.api = {
  headers: { } as any,
  baseURL: 'https://blog.api.webion.it/',
  withCredentials: true,
}

ContactUsContext.api = {
  headers: { } as any,
  baseURL: 'api/contact-us',
  withCredentials: true,
}

export default function RootLayout({ Component, pageProps }: AppProps) {
  return (
    <CookieWrapper 
      name="webion"
      scriptsComponents={<>
        <Script strategy='worker' src="scripts/pixel.js"/>
        <Script strategy="lazyOnload" src="scripts/hotjar.js"/>
        <Script strategy="lazyOnload" src="https://www.googletagmanager.com/gtag/js?id=G-1MN32P60E7"/>
        <Script strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'G-1MN32P60E7');
          `}
        </Script>
      </>}
    >

      <Head>
        <link rel="shortcut icon" href="assets/favicon.ico" />
        <title>Webion</title>
      </Head>
      <LanguageWrapper
        availableLanguages={{
          it: { translation: it, langTranslation: 'Italiano' },
          en: { translation: en, langTranslation: 'English' },
        }}
      >
        <ThemeWrapper
          themes={{
            dark: darkTheme,
            light: lightTheme,
          }}
        >
          <CssBaseline />
          <GlobalStyles styles={globalStyle as any} />
          
          <CookiePopup privacyUrl="/policies-licenses"/>
          <Layout
            AppBarComponent={<WebionAppBar />}
            FooterComponent={<WebionFooter />}
            SidebarComponent={<WebionSideBar />}
            sx={{ marginTop: 0 }}
          >
            <Component {...pageProps} />
          </Layout>
          <WebionSpeedDial/>
        </ThemeWrapper>
      </LanguageWrapper>
    </CookieWrapper>
  )
}