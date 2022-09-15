import { ContactUsApi } from '@whub/apis-contactus';
import { ApiWrapper } from '@whub/apis-react';
import { SimpleAuthApi } from '@whub/simple-auth';
import { WShopApi } from '@whub/wshop-api';
import { Validators } from '@whub/wui';
import * as ReactDOM from 'react-dom/client';
import { App } from './app/app';

const auth = new SimpleAuthApi({
    baseUrl: 'https://api.simm.webion.it',
    withCredentials: true,
  })

const shop = new WShopApi({
  baseUrl: 'https://api.simm.webion.it',
  withCredentials: true,
})

const contactUs = new ContactUsApi({
  baseUrl: 'https://api.simm.webion.it/contactus',
  withCredentials: true,
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ApiWrapper
    apis={{
      auth: { api: auth },
      contactUs: { api: contactUs, },
      shop: { api: shop, config: {
        name: { validators: { general: [Validators.max(512)] } },
        code: { validators: { general: [Validators.max(256)] } },
        category: { show: true, validators: { general: [Validators.max(256)] } },
        price: { show: true, validators: { general: [] } },
        description: { show: true, validators: { general: [Validators.max(4096)] } },
        relatedProducts: { show: true, validators: { general: [] } },
        details: { show: true, validators: {
          title: [Validators.max(512)],
          description: [Validators.max(4096)]
        }},
        images: { show: true, validators: { general: [] } },
        attachments: { show: true, validators: { general: [] } },
      }},
    }}
  >
    <App/>
  </ApiWrapper>
);


