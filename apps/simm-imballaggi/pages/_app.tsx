import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { ContactUsApi } from '@whub/apis-contactus';
import { AppContext, AuthWrapper } from '@whub/apis-react';
import { SimpleAuthApi } from '@whub/simple-auth';
import { WShopApi } from '@whub/wshop-api';
import { CookiePopup, GlobalDialogs, LanguageWrapper, Validators } from '@whub/wui';
import { ES, GB, IT } from 'country-flag-icons/react/3x2';
import { AppProps } from 'next/app';
import Head from 'next/head';
import ContactsDialog from '../components/dialogs/ContactsDialog';
import globalStyle from '../theme/globalStyle';
import theme from '../theme/theme';
import './styles.css';

import { ComponentType } from 'react';
import { SimmLayout } from '../components/layout/SimmLayout';
import en from '../public/assets/locales/en-EN.json';
import es from '../public/assets/locales/es-ES.json';
import it from '../public/assets/locales/it-IT.json';

const auth = new SimpleAuthApi({
  baseUrl: 'http://localhost:5181', //'https://api.simm.webion.it'
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


type ComponentWithPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    Layout?: ComponentType
  }
}

AppContext.contactUs = {
  api: contactUs,
}

AppContext.auth = {
  api: auth
}

AppContext.shop = {
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
    videos: { show: true, validators: { general: [] } },
  }
}


function CustomApp({ Component, pageProps }: ComponentWithPageLayout) {
  const Layout = Component.Layout || SimmLayout

  return (
    <AuthWrapper>
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
                <title>SIMM Imballaggi</title>
              </Head>
              <Layout>
                <CookiePopup name="simm-imballaggi" privacyUrl="privacy" />
                <Component {...pageProps} />
              </Layout>
          </GlobalDialogs>
        </LanguageWrapper>
      </ThemeProvider>
    </AuthWrapper>
  );
}

export default CustomApp;
