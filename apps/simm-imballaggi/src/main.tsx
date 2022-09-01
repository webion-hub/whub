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
        baseUrl: 'http://localhost:5181',
        withCredentials: true,
      }),
      contactUs: new ContactUsApi({
        baseUrl: 'https://api.webion.it/contactus',
        withCredentials: true,
      }),
      auth: new SimpleAuthApi({
        baseUrl: 'http://localhost:5181',
        withCredentials: true,
      }),
    }}
  >
    <AuthWrapper>
      <App/>
    </AuthWrapper>
  </ApiWrapper>
);
