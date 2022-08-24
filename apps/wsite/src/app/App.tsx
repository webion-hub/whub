import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../assets/locales/en-EN.json";
import it from "../assets/locales/it-IT.json";

import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Homepage from './pages/home-page/Homepage';
import theme from './theme/theme'
import { GlobalStyles, CssBaseline, CircularProgress, Grid, Backdrop} from '@mui/material';
import globalStyle from './theme/globalStyle';
import PoliciesAndLicensesPage from './pages/policies-licenses-page/PoliciesAndLicensesPage';
import { useState } from "react";
import { Language, LanguageWrapper, Layout, MaybeShow } from "@whub/wui";
import LandingPage from "./pages/landing-page/LandingPage";
import WebionFooter from "./components/layout/WebionFooter";
import WebionSideBar from "./components/layout/WebionSideBar";
import WebionAppbar from "./components/layout/WebionAppBar";
import CookiePopup from "./components/cookie_popup/CookiePopup";

export function App() {
  const [loading, setLoading] = useState(true)

  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        it: { translation: it }
      },
      lng: Language.getLocalLanguage(),

      interpolation: {
        escapeValue: false
      }
    })
    .finally(() => setLoading(false))

  document.title = 'Webion'

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline/>
        <GlobalStyles styles={globalStyle}></GlobalStyles>
      <LanguageWrapper i18n={i18n}>
        <MaybeShow
          show={!loading}
          alternativeChildren={
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
              sx={{height: '100vh'}}
            >
              <CircularProgress/>
            </Grid>
          }
        >
          <BrowserRouter>
            <Layout
              AppBarComponent={<WebionAppbar/>}
              FooterComponent={<WebionFooter/>}
              SidebarComponent={<WebionSideBar/>}
            >
             <CookiePopup/>
              <Routes>
                <Route key="home" path="/"  element={<Homepage/>}/>
                <Route key="call" path="/call"  element={<LandingPage/>}/>
                <Route key="policies" path="/policies-licenses" element={<PoliciesAndLicensesPage/>}/>
                <Route key="all" path="/*" element={<Homepage/>}/>
              </Routes>
            </Layout>
          </BrowserRouter>
        </MaybeShow>
      </LanguageWrapper>  
    </ThemeProvider>
  )
}