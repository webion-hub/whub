import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../assets/locales/en-EN.json";
import it from "../assets/locales/it-IT.json";

import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Homepage from './pages/home-page/Homepage';
import theme from './theme/theme'
import { GlobalStyles, CssBaseline } from '@mui/material';
import globalStyle from './theme/globalStyle';
import { useEffect } from "react";
import { Language, LanguageWrapper, Layout } from "@whub/wui";
import LoginPage from "./pages/login-page/LoginPage";
import SimmAppbar from "./components/layout/SimmAppBar";
import SimmSideBar from "./components/layout/SimmSideBar";
import SimmFooter from "./components/layout/SimmFooter";
import { TableProductsPage } from "./pages/table-products-page/TableProductsPage";
import { AddProduct, EditProduct } from "@whub/wshop-ui";
import { ProductPage } from "./pages/product-page/ProductPage";

export function App() {

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
              <Route key="home" path="/"  element={<Homepage/>}/>
              <Route key="login" path="/login"  element={<LoginPage/>}/>
              <Route key="product" path="/product/:id"  element={<ProductPage/>}/>
              <Route key="add-product" path="/add-product"  element={<AddProduct/>}/>
              <Route key="add-product" path="/edit-product/:id"  element={<EditProduct/>}/>
              <Route key="products-table" path="/products-table"  element={<TableProductsPage/>}/>
            </Routes>
          </Layout>
        </BrowserRouter>
      </LanguageWrapper>
    </ThemeProvider>
  )
}
