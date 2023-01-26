
import it from '../public/assets/locales/it-IT.json';

import Head from "next/head";
import Script from "next/script";
import Layout from "@wui/layout/Layout";

import LanguageWrapper from "@wui/wrappers/Language";
import ThemeWrapper from "@wui/wrappers/Theme";
import { AppProps } from "next/app";

import dynamic from 'next/dynamic';
import { Analytics } from '@vercel/analytics/react';

//SPOSTARE IN ImageCropperDialog
//TOGLIERE L'IMPORT DI CROPPER JS DA PACKAGEJSON
import "cropperjs/dist/cropper.css";
import { darkTheme, lightTheme } from '@wui/themes';
import globalStyle from '@wui/themes/themes/globalStyle';

const CssBaseline = dynamic(() => import("@mui/material/CssBaseline"), { ssr: true })
const GlobalStyles = dynamic(() => import("@mui/material/GlobalStyles"), { ssr: true })

export default function RootLayout({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script strategy='worker' src="scripts/pixel.js"/>
      <Script strategy='worker' src="scripts/hotjar.js"/>
      <Analytics/>
      <Head>
        <link rel="shortcut icon" href="assets/favicon.ico" />
        <title>Webion</title>
      </Head>
      <LanguageWrapper
        availableLanguages={{
          it: { translation: it, langTranslation: 'Italiano' },
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

          <Layout
            sx={{ marginTop: 0 }}
          >
            <Component {...pageProps} />
          </Layout>
        </ThemeWrapper>
      </LanguageWrapper>
    </>
  )
}