import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../assets/locales/en-EN.json";
import it from "../assets/locales/it-IT.json";
import es from "../assets/locales/es-ES.json";

import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { CssBaseline, GlobalStyles } from '@mui/material';
import { CookiePopup, FullScreenLoading, GlobalDialogs, Language, LanguageWrapper, Layout } from "@whub/wui";
import globalStyle from './theme/globalStyle';
import theme from './theme/theme';
import { Guard, Guards } from "@whub/apis-react";
import React, { Suspense } from "react";
import ContactsDialog from "./components/dialogs/ContactsDialog";

const SimmAppbar = React.lazy(() => import('./components/layout/SimmAppBar'))
const SimmFooter = React.lazy(() => import('./components/layout/SimmFooter'))

const Homepage = React.lazy(() => import('./pages/home-page/Homepage'))
const LoginPage = React.lazy(() => import('./pages/login-page/LoginPage'))

const PrivacyPolicy = React.lazy(
  () => import('./pages/privacy-policy/PrivacyPolicy').then(module => ({ default: module.PrivacyPolicy }))
)

const ProductPage = React.lazy(
  () => import('./pages/product-page/ProductPage').then(module => ({ default: module.ProductPage }))
)

const ProductsPage = React.lazy(
  () => import('./pages/products-page/ProductsPage').then(module => ({ default: module.ProductsPage }))
)

const TableProductsPage = React.lazy(
  () => import('./pages/table-products-page/TableProductsPage').then(module => ({ default: module.TableProductsPage }))
)

const AddProduct = React.lazy(
  () => import('@whub/wshop-ui').then(module => ({ default: module.AddProduct }))
)

const EditProduct = React.lazy(
  () => import('@whub/wshop-ui').then(module => ({ default: module.EditProduct }))
)

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
                <Suspense
                  fallback={ <FullScreenLoading loading/> }
                >
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
                </Suspense>
              </Layout>
            </BrowserRouter>
          </LanguageWrapper>
      </GlobalDialogs>
    </ThemeProvider>
  )
}
