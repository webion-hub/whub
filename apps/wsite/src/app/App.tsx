import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../assets/locales/en-EN.json";
import it from "../assets/locales/it-IT.json";

import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Homepage from './pages/home-page/Homepage';
import theme from './theme/theme'
import { GlobalStyles, CssBaseline, CircularProgress, Grid, Box } from '@mui/material';
import globalStyle from './theme/globalStyle';
import PoliciesAndLicensesPage from './pages/policies-licenses-page/PoliciesAndLicensesPage';
import { createContext, useEffect, useRef, useState } from "react";
import { ChildrenProps, CookiePopup, Coords, Language, LanguageWrapper, Layout, MaybeShow } from "@whub/wui";
import LandingPage from "./pages/landing-page/LandingPage";
import WebionFooter from "./components/layout/WebionFooter";
import WebionSideBar from "./components/layout/WebionSideBar";
import WebionAppbar from "./components/layout/WebionAppBar";
import { GB, IT } from "country-flag-icons/react/3x2";
import { fromEvent } from "rxjs";

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
      <CursorWrapper>
        <LanguageWrapper
          i18n={i18n}
          availableLanguages={[
            { code: 'it', flag: IT },
            { code: 'en', flag: GB },
          ]}
        >
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
          </MaybeShow>
        </LanguageWrapper>
      </CursorWrapper>
    </ThemeProvider>
  )
}


export const CursorContext = createContext<any>({})

export const CursorWrapper = (props: ChildrenProps) => {
  const cursorRef = useRef<HTMLDivElement>()
  const size = 32

  useEffect(() => {
    const sub = fromEvent(window, 'mousemove')
      .subscribe((e) => {
        const event = e as MouseEvent

        if(!cursorRef.current)
          return

          cursorRef.current.style.transform =  `translate(
            ${event.clientX - size/2 + window.scrollX}px,
            ${event.clientY - size/2 + window.scrollY}px
          )`
      })

    return () => sub.unsubscribe()
  }, [])

  return (
    <CursorContext.Provider
      value={{}}
    >
      <Box
        ref={cursorRef}
        sx={{
          zIndex: 1000000000,
          position: 'absolute',
          pointerEvents: 'none',
          width: size,
          aspectRatio: '1',
          borderRadius: '100%',
          border: theme => `4px solid ${theme.palette.primary.main}`,
        }}
      />
      {props.children}
    </CursorContext.Provider>
  )
}
