import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../assets/locales/en-EN.json";
import it from "../assets/locales/it-IT.json";

import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, RouteProps, Routes, Navigate, useNavigate } from "react-router-dom";

import Homepage from './pages/home-page/Homepage';
import theme from './theme/theme'
import { GlobalStyles, CssBaseline } from '@mui/material';
import globalStyle from './theme/globalStyle';
import { ReactNode, useEffect, useState } from "react";
import { Guard, Language, LanguageWrapper, Layout } from "@whub/wui";
import LoginPage from "./pages/login-page/LoginPage";
import SimmAppbar from "./components/layout/SimmAppBar";
import SimmFooter from "./components/layout/SimmFooter";
import { TableProductsPage } from "./pages/table-products-page/TableProductsPage";
import { AddProduct, EditProduct } from "@whub/wshop-ui";
import { ProductPage } from "./pages/product-page/ProductPage";
import { ProductsPage } from "./pages/products-page/ProductsPage";

export function App() {
  const [isLogged, setIsLogged] = useState(true)

  useEffect(() => {
    return
  }, [])

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

  document.title = 'Simm'

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <GlobalStyles styles={globalStyle}></GlobalStyles>
      <LanguageWrapper i18n={i18n}>
        <BrowserRouter>
          <Layout
            AppBarComponent={<SimmAppbar/>}
            FooterComponent={<SimmFooter/>}
          >
            <Routes>
              <Route path="/" element={<Homepage/>}/>
              <Route path="/login"  element={<LoginPage/>}/>
              <Route path="/product/:id"  element={<ProductPage/>}/>
              <Route path="/products"  element={<ProductsPage/>}/>
              <Route
                path="/add-product"
                element={
                  <Guard canNavigate={isLogged} redirectTo="/" el={<AddProduct/>}/>
                }
              />
              <Route
                path="/edit-product/:id"
                element={
                  <Guard canNavigate={isLogged} redirectTo="/" el={<EditProduct/>}/>
                }
              />
              <Route
                path="/products-table"
                element={
                  <Guard canNavigate={isLogged} redirectTo="/" el={<TableProductsPage/>}/>
                }
              />
            </Routes>
          </Layout>
        </BrowserRouter>
      </LanguageWrapper>
    </ThemeProvider>
  )
}
