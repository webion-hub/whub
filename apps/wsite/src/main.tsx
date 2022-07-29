import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './app/components/layout/Layout';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./assets/locales/en-EN.json";
import it from "./assets/locales/it-IT.json";

import Homepage from './app/pages/home-page/Homepage';
import theme from './app/theme/theme'
import { GlobalStyles, CssBaseline} from '@mui/material';
import globalStyle from './app/theme/globalStyle';
import PoliciesAndLicensesPage from './app/pages/policies-licenses-page/PoliciesAndLicensesPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      it: { translation: it }
    },
    lng: "it",

    interpolation: {
      escapeValue: false
    }
  });


root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <GlobalStyles styles={globalStyle}></GlobalStyles>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route key="home" path="/"  element={<Homepage/>}/>
            <Route key="policies" path="/policies-licenses" element={<PoliciesAndLicensesPage/>}/>
            <Route key="all" path="/*" element={<Homepage/>}/>
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);