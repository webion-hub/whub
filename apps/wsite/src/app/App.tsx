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
import PoliciesAndLicensesPage from './pages/policies-licenses-page/PoliciesAndLicensesPage';
import { useState } from "react";
import { MaybeShow } from "@whub/wui";

export function App() {
  const [loading, setLoading] = useState(true)

  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        it: { translation: it }
      },
      lng: navigator.language,

      interpolation: {
        escapeValue: false
      }
    })
    .finally(() => setLoading(false))

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <GlobalStyles styles={globalStyle}></GlobalStyles>
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
              <Route key="policies" path="/policies-licenses" element={<PoliciesAndLicensesPage/>}/>
              <Route key="all" path="/*" element={<Homepage/>}/>
            </Routes>
          </Layout>
        </BrowserRouter>
      </MaybeShow>
    </ThemeProvider>
  )
}