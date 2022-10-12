import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { ContactUsApi } from '@whub/apis-contactus';
import { ApiWrapper } from '@whub/apis-react';
import { SimpleAuthApi } from '@whub/simple-auth';
import { WShopApi } from '@whub/wshop-api';
import { CookiePopup, GlobalDialogs, LanguageWrapper, Layout, Validators } from '@whub/wui';
import { ES, GB, IT } from 'country-flag-icons/react/3x2';
import { AppProps } from 'next/app';
import Head from 'next/head';
import ContactsDialog from '../components/dialogs/ContactsDialog';
import SimmAppbar from '../components/layout/SimmAppBar';
import SimmFooter from '../components/layout/SimmFooter';
import globalStyle from '../theme/globalStyle';
import theme from '../theme/theme';
import './styles.css';


import en from '../public/assets/locales/en-EN.json';
import it from '../public/assets/locales/it-IT.json';
import es from '../public/assets/locales/es-ES.json';

const auth = new SimpleAuthApi({
  baseUrl: 'https://api.simm.webion.it', //'http://localhost:5181'
  withCredentials: true,
});

const shop = new WShopApi({
  baseUrl: 'https://api.simm.webion.it', //'http://localhost:5181'
  withCredentials: true,
});

const contactUs = new ContactUsApi({
  baseUrl: 'https://api.simm.webion.it/contactus',
  withCredentials: true,
});

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ApiWrapper
      apis={{
        auth: { api: auth },
        contactUs: { api: contactUs },
        shop: {
          api: shop,
          config: {
            name: { validators: { general: [Validators.max(512)] } },
            code: { validators: { general: [Validators.max(256)] } },
            category: {
              show: true,
              validators: { general: [Validators.max(256)] },
            },
            price: { show: true, validators: { general: [] } },
            description: {
              show: true,
              validators: { general: [Validators.max(4096)] },
            },
            relatedProducts: { show: true, validators: { general: [] } },
            details: {
              show: true,
              validators: {
                title: [Validators.max(512)],
                description: [Validators.max(4096)],
              },
            },
            images: { show: true, validators: { general: [] } },
            attachments: { show: true, validators: { general: [] } },
          },
        },
      }}
    >
      <ThemeProvider theme={theme}>
        <LanguageWrapper
          availableLanguages={{
            it: { flag: IT, translation: it },
            en: { flag: GB, translation: en },
            es: { flag: ES, translation: es }
          }}
        >
          <GlobalDialogs
            dialogs={[
              {
                component: ContactsDialog,
                key: 'contacts',
              },
            ]}
          >
            <CssBaseline />
            <GlobalStyles styles={globalStyle}></GlobalStyles>
              <Head>
                <title>Welcome to simm-imballaggi!</title>
              </Head>
              <main>
                <Layout
                  AppBarComponent={<SimmAppbar />}
                  FooterComponent={<SimmFooter />}
                >
                  <CookiePopup name="simm-imballaggi" privacyUrl="privacy" />
                      <Component {...pageProps} />
                </Layout>
              </main>
          </GlobalDialogs>
        </LanguageWrapper>
      </ThemeProvider>
    </ApiWrapper>
  );
}

export default CustomApp;
