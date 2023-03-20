
import Layout from "@wui/layout/Layout";
import Head from "next/head";

import ThemeWrapper from "@wui/wrappers/Theme";
import { AppProps } from "next/app";

import { darkTheme, globalStyle, lightTheme } from "@wui/theme";

import dynamic from 'next/dynamic';
import { Footer } from "../components/Footer";
import Page from "@wui/layout/Page";
import Sections from "@wui/layout/Sections";
import { Appbar } from "../components/Appbar";

const CookiePopup = dynamic(() => import("@wui/components/CookiePopup"), { ssr: true })
const CssBaseline = dynamic(() => import("@mui/material/CssBaseline"), { ssr: true })
const GlobalStyles = dynamic(() => import("@mui/material/GlobalStyles"), { ssr: true })


export const pageMaxWidth = 1000

export default function RootLayout({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="assets/favicon.ico" />
        <title>
          Calcolatore costo App
        </title>
      </Head>
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
        
        <CookiePopup
          usePixel
          name="webion"
          privacyUrl="/policies-licenses"
        />
        <Layout
          sx={{ marginTop: 0 }}
          AppBarComponent={<Appbar/>}
          FooterComponent={<Footer/>}
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
    </>
  )
}