import { EmailRounded, Facebook, GitHub, Instagram, LinkedIn, PhoneRounded } from "@mui/icons-material";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { CookiePopup, MaybeShow, SpeedDial } from "@wui/components"
import { Layout } from "@wui/layout";
import { LanguageWrapper, ThemeWrapper } from "@wui/wrappers";
import { GB, IT } from "country-flag-icons/react/3x2";
import { AppProps } from "next/app"
import Head from "next/head";
import Script from "next/script"
import { useEffect, useState } from "react";
import { WebionAppbar } from "../components/layout/WebionAppBar/WebionAppBar";
import WebionFooter from "../components/layout/WebionFooter/WebionFooter";
import WebionSideBar from "../components/layout/WebionSideBar/WebionSideBar";
import { WebionRepository } from "../lib/WebionRepositiory";

import en from '../public/assets/locales/en-EN.json';
import it from '../public/assets/locales/it-IT.json';
import { darkTheme, lightTheme } from "../theme/getTheme";
import globalStyle from "../theme/globalStyle";
import { Agent } from "https";

import BlogApi from "@wapi/blog";
import ContactUsApi from "@wapi/contactus";
import AppContext from "@wapi/next";


//SPOSTARE IN ImageCropperDialog
import "cropperjs/dist/cropper.css";


const contactUs = new ContactUsApi({
  baseURL: 'https://api.webion.it/contactus',
  withCredentials: true,
});

const blog = new BlogApi({
  baseURL: 'https://w0/webion/blog/api',
  withCredentials: true,
  httpsAgent: new Agent({
    rejectUnauthorized: false,
  }),
});

AppContext.contactUs = {
  api: contactUs,
};

AppContext.blog = {
  api: blog
}

export default function RootLayout({ Component, pageProps }: AppProps) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, []);

  return (
    <>
      <Script strategy='worker' src="scripts/pixel.js"/>
      <MaybeShow show={ready && false}>
        <Script id="yandex" >
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(90356482, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true
            });
          `}
        </Script>
      </MaybeShow>

      <Head>
        <link rel="shortcut icon" href="assets/favicon.ico" />
        <title>Webion</title>
      </Head>
      <LanguageWrapper
        availableLanguages={{
          it: { flag: IT, translation: it, langTranslation: 'Italiano' },
          en: { flag: GB, translation: en, langTranslation: 'English' },
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
    </>
  )
}