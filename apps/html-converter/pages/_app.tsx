import it from '../public/assets/locales/it-IT.json';

import Layout from "@wui/layout/Layout";
import Head from "next/head";

import ThemeWrapper from "@wui/wrappers/Theme";
import { AppProps } from "next/app";

import { darkTheme, globalStyle, lightTheme } from "@wui/theme";

import Page from "@wui/layout/Page";
import Sections from "@wui/layout/Sections";
import BaseFooter from "@wui/sections/BaseFooter";
import { CookieWrapper } from '@wui/wrappers/Cookie/CookieWrapper';
import { LanguageWrapper } from "@wui/wrappers/Language/Language";
import dynamic from 'next/dynamic';

const CookiePopup = dynamic(() => import("@wui/components/CookiePopup"), { ssr: true })
const CssBaseline = dynamic(() => import("@mui/material/CssBaseline"), { ssr: true })
const GlobalStyles = dynamic(() => import("@mui/material/GlobalStyles"), { ssr: true })

export const pageMaxWidth = 1000

export default function RootLayout({ Component, pageProps }: AppProps) {
  return (
    <CookieWrapper
      name="webion-hmlt-converter"
    >
      <Head>
        <link rel="shortcut icon" href="assets/favicon.ico" />
        <title>
          Html Converter
        </title>
        <meta
          content="Trasforma facilmente i tuoi file HTML in PDF con il nostro convertitore online gratuito e veloce. Perfetto per professionisti e principianti, ottieni risultati di alta qualità in pochi clic!"
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