import { WShopApi } from '@whub/wshop-api';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { App } from './app/app';

export const shop = new WShopApi({
  baseUrl: 'https://localhost:7099',
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
