import it from '../public/assets/locales/it-IT.json';

import Layout from "@wui/layout/Layout";
import Head from "next/head";

import ThemeWrapper from "@wui/wrappers/Theme";
import { AppProps } from "next/app";

import { darkTheme, globalStyle, lightTheme } from "@wui/theme";

import dynamic from 'next/dynamic';
import Page from "@wui/layout/Page";
import BaseFooter from "@wui/sections/BaseFooter";
import Sections from "@wui/layout/Sections";
import { Appbar } from "../components/Appbar";
import { LanguageWrapper } from "@wui/wrappers/Language/Language";
import { CookieWrapper } from '@wui/wrappers/Cookie/CookieWrapper';

import ContactUsContext from '@wapi-ui/contactus/ContactUsContext/ContactUsContext';

ContactUsContext.api = {
  headers: { } as any,
  baseURL: 'api/contact-us',
  withCredentials: true,
}

const CookiePopup = dynamic(() => import("@wui/components/CookiePopup"), { ssr: true })
const CssBaseline = dynamic(() => import("@mui/material/CssBaseline"), { ssr: true })
const GlobalStyles = dynamic(() => import("@mui/material/GlobalStyles"), { ssr: true })


export const pageMaxWidth = 1000

export default function RootLayout({ Component, pageProps }: AppProps) {
  return (
    <CookieWrapper
      name="webion-app-calculator"
    >
      <Head>
        <link rel="shortcut icon" href="assets/favicon.ico" />
        <title>
          Calcolatore costo App
        </title>
        <meta
          content="Rivela il costo di sviluppo della tua app ideale con il nostro calcolatore online innovativo e gratuito. Ottieni preventivi dettagliati e su misura per iOS, Android o entrambi, con facilità e velocità!"
          name="description"
        />
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
          <GlobalStyles styles={{
            ...globalStyle as any,
            "section": {
              maxWidth: `${pageMaxWidth}px !important`
            }
          }} />
          
          <CookiePopup privacyUrl="https://webion.it/policies-licenses"/>
          <Layout
            sx={{ marginTop: 0 }}
            AppBarComponent={<Appbar/>}
            FooterComponent={<BaseFooter/>}
          >
            <Page>
              <Sections
                sx={{ 
                  paddingInline: 4,
                  paddingBottom: 16,
                }}
              >
                <Component {...pageProps} />
              </Sections>
            </Page>
          </Layout>
        </ThemeWrapper>
      </LanguageWrapper>
    </CookieWrapper>
  )
}