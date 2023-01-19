
import en from '../public/assets/locales/en-EN.json';
import it from '../public/assets/locales/it-IT.json';

import Head from "next/head";
import Script from "next/script";
import Layout from "@wui/layout/Layout";

import LanguageWrapper from "@wui/wrappers/Language";
import ThemeWrapper from "@wui/wrappers/Theme";
import { AppProps } from "next/app";

import { darkTheme, lightTheme } from "../theme/getTheme";
import globalStyle from "../theme/globalStyle";

import BlogApi from "@wapi/blog";
import ContactUsApi from "@wapi/contactus";
import AppContext from "@wapi/next";
import dynamic from 'next/dynamic';

//SPOSTARE IN ImageCropperDialog
//TOGLIERE L'IMPORT DI CROPPER JS DA PACKAGEJSON
import "cropperjs/dist/cropper.css";

const CookiePopup = dynamic(() => import("@wui/components/CookiePopup"), { ssr: true })
const WebionSpeedDial = dynamic(() => import("../components/others/WebionSpeedDial"), { ssr: true })
const WebionAppBar = dynamic(() => import("../components/layout/WebionAppBar/WebionAppBar"), { ssr: true })
const WebionSideBar = dynamic(() => import("../components/layout/WebionSideBar/WebionSideBar"))
const WebionFooter = dynamic(() => import("../components/layout/WebionFooter/WebionFooter"), { ssr: true })
const CssBaseline = dynamic(() => import("@mui/material/CssBaseline"), { ssr: true })
const GlobalStyles = dynamic(() => import("@mui/material/GlobalStyles"), { ssr: true })

const contactUs = new ContactUsApi({
  headers: { } as any,
  baseURL: 'https://api.webion.it/contactus',
  withCredentials: true,
});

const blog = new BlogApi({
  headers: { } as any,
  baseURL: 'https://w0/webion/blog/api',
  withCredentials: true,

});

AppContext.contactUs = {
  api: contactUs,
};

AppContext.blog = {
  api: blog
}

export default function RootLayout({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script strategy='worker' src="scripts/pixel.js"/>
      <Script strategy='worker' src="scripts/hotjar.js"/>
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
          
          <CookiePopup
            usePixel
            name="webion"
            privacyUrl="/policies-licenses"
          />
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
    </>
  )
}