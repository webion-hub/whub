import { ContactUsApi } from '@whub/apis-contactus';
import { ApiWrapper } from '@whub/apis-react';
import { WShopApi } from '@whub/wshop-api';
import { StrictMode,  } from 'react';
import * as ReactDOM from 'react-dom/client';
import { App } from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ApiWrapper
      apis={{
        shop: new WShopApi({
          baseUrl: 'http://localhost:5181',
        }),
        contactUs: new ContactUsApi({
          baseUrl: 'https://api.webion.it/contactus',
        })
      }}
    >
      <App />
    </ApiWrapper>
  </StrictMode>
);
