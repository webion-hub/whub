import { ContactUsApi } from '@whub/apis-contactus';
import { ApiWrapper, AuthWrapper } from '@whub/apis-react';
import { SimpleAuthApi } from '@whub/simple-auth';
import { WShopApi } from '@whub/wshop-api';
import * as ReactDOM from 'react-dom/client';
import { App } from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ApiWrapper
    apis={{
      shop: new WShopApi({
        baseUrl: 'https://api.simm.webion.it',
        withCredentials: true,
      }),
      contactUs: new ContactUsApi({
        baseUrl: 'https://api.simm.webion.it/contactus',
        withCredentials: true,
      }),
      auth: new SimpleAuthApi({
        baseUrl: 'https://api.simm.webion.it',
        withCredentials: true,
      }),
    }}
  >
    <AuthWrapper>
      <App/>
    </AuthWrapper>
  </ApiWrapper>
);
