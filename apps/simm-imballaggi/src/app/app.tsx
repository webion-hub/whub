import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../assets/locales/en-EN.json";
import it from "../assets/locales/it-IT.json";
import es from "../assets/locales/es-ES.json";

import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { CssBaseline, GlobalStyles } from '@mui/material';
import { AddProduct, EditProduct } from "@whub/wshop-ui";
import { CookiePopup, GlobalDialogs, Language, LanguageWrapper, Layout } from "@whub/wui";
import ContactsDialog from "./components/dialogs/ContactsDialog";
import SimmAppbar from "./components/layout/SimmAppBar";
import SimmFooter from "./components/layout/SimmFooter";
import Homepage from './pages/home-page/Homepage';
import LoginPage from "./pages/login-page/LoginPage";
import { ProductPage } from "./pages/product-page/ProductPage";
import { ProductsPage } from "./pages/products-page/ProductsPage";
import { TableProductsPage } from "./pages/table-products-page/TableProductsPage";
import globalStyle from './theme/globalStyle';
import theme from './theme/theme';
import { Guard, Guards } from "@whub/apis-react";
import { PrivacyPolicy } from "./pages/privacy-policy/PrivacyPolicy";

export function App() {
  const isAdminGuard = Guards.useIsAdminGuard()

  i18n
    .use(initReactI18next)
    .init({
      resources: {
        en: { translation: en },
        it: { translation: it },
        es: { translation: es },
      },
      lng: Language.getLocalLanguage(),

      interpolation: {
        escapeValue: false
      }
    })

  document.title = 'Simm'

  return (
    <ThemeProvider theme={theme}>
      <GlobalDialogs
        dialogs={[
          {
            component: ContactsDialog,
            key: 'contacts'
          }
        ]}
      >
          <CssBaseline/>
          <GlobalStyles styles={globalStyle}></GlobalStyles>
          <LanguageWrapper i18n={i18n}>
            <BrowserRouter>
              <Layout
                AppBarComponent={<SimmAppbar/>}
                FooterComponent={<SimmFooter/>}
              >
                <CookiePopup
                  name="simm-imballaggi"
                  privacyUrl="privacy"
                />
                <Routes>
                  <Route path="/" element={<Homepage/>}/>
                  <Route path="/privacy" element={<PrivacyPolicy/>}/>
                  <Route path="/login"  element={<LoginPage/>}/>
                  <Route path="/product/:id"  element={<ProductPage/>}/>
                  <Route path="/products"  element={<ProductsPage/>}/>
                  <Route
                    path="/add-product"
                    element={
                      <Guard canNavigate={isAdminGuard} redirectTo="/" el={<AddProduct/>}/>
                    }
                  />
                  <Route
                    path="/edit-product/:id"
                    element={
                      <Guard canNavigate={isAdminGuard} redirectTo="/" el={<EditProduct/>}/>
                    }
                  />
                  <Route
                    path="/products-table"
                    element={
                      <Guard canNavigate={isAdminGuard} redirectTo="/" el={<TableProductsPage/>}/>
                    }
                  />
                </Routes>
              </Layout>
            </BrowserRouter>
          </LanguageWrapper>
      </GlobalDialogs>
    </ThemeProvider>
  )
}
