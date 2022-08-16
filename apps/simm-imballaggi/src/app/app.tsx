import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../assets/locales/en-EN.json";
import it from "../assets/locales/it-IT.json";

import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './components/layout/Layout';

import Homepage from './pages/home-page/Homepage';
import theme from './theme/theme'
import { GlobalStyles, CssBaseline, CircularProgress, Grid} from '@mui/material';
import globalStyle from './theme/globalStyle';
import { useState } from "react";
import { Language, LanguageWrapper, MaybeShow } from "@whub/wui";
import ContactsPage from "./pages/contacts-page/ContactsPage";
import LoginPage from "./pages/login-page/LoginPage";

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

  document.title = 'Simm'

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
            <Layout>
              <Routes>
                <Route key="home" path="/"  element={<Homepage/>}/>
                <Route key="contacts" path="/contacts"  element={<ContactsPage/>}/>
                <Route key="login" path="/login"  element={<LoginPage/>}/>
              </Routes>
            </Layout>
          </BrowserRouter>
        </MaybeShow>
      </LanguageWrapper>
    </ThemeProvider>
  )
}
