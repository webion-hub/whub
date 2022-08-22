import { Api } from '@whub/api';
import { WShopApi } from '@whub/wshop-api';
import { StrictMode,  } from 'react';
import * as ReactDOM from 'react-dom/client';
import { App } from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Api
      apis={{
        shop: new WShopApi({ baseUrl: 'https://localhost:7099' })
      }}
    >
      <App />
    </Api>
  </StrictMode>
);
