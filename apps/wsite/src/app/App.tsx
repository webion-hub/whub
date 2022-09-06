import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../assets/locales/en-EN.json";
import it from "../assets/locales/it-IT.json";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { CssBaseline, GlobalStyles } from '@mui/material';
import { CookiePopup, Language, LanguageWrapper, Layout, ThemeWrapper } from "@whub/wui";
import { GB, IT } from "country-flag-icons/react/3x2";
import WebionAppbar from "./components/layout/WebionAppBar";
import WebionFooter from "./components/layout/WebionFooter";
import WebionSideBar from "./components/layout/WebionSideBar";
import Homepage from './pages/Homepage';
import LandingPage from "./pages/LandingPage";
import PoliciesAndLicensesPage from './pages/policies-licenses-page/PoliciesAndLicensesPage';
import globalStyle from './theme/globalStyle';
import darkTheme from "./theme/darkTheme";
import lightTheme from "./theme/lightTheme";

export function App() {
  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        it: { translation: it },
      },
      lng: Language.getLocalLanguage(),

      interpolation: {
        escapeValue: false
      }
    })

  document.title = 'Webion'

  return (
    <ThemeWrapper
      default="dark"
      themes={{
        dark: darkTheme,
        light: lightTheme,
      }}
    >
      <CssBaseline/>
      <GlobalStyles styles={globalStyle}></GlobalStyles>
      <LanguageWrapper
        i18n={i18n}
        availableLanguages={[
          { code: 'it', flag: IT },
          { code: 'en', flag: GB },
        ]}
      >
        <BrowserRouter>
          <Layout
            AppBarComponent={<WebionAppbar/>}
            FooterComponent={<WebionFooter/>}
            SidebarComponent={<WebionSideBar/>}
          >
          <CookiePopup
            usePixel
            name="webion"
            privacyUrl="/policies-licenses"
          />
            <Routes>
              <Route key="home" path="/"  element={<Homepage/>}/>
              <Route key="call" path="/call"  element={<LandingPage/>}/>
              <Route key="policies" path="/policies-licenses" element={<PoliciesAndLicensesPage/>}/>
              <Route key="all" path="/*" element={<Homepage/>}/>
            </Routes>
          </Layout>
        </BrowserRouter>
      </LanguageWrapper>
    </ThemeWrapper>
  )
}
