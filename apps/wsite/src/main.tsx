import { ContactUsApi } from '@whub/apis/contactus';
import { ApiWrapper } from '@whub/apis/react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import ReactPixel from 'react-facebook-pixel';
import { App } from './app/App';

import './styles.css'

ReactPixel.init('592480175654211');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <StrictMode>
    <ApiWrapper
      apis={{
        contactUs: new ContactUsApi({ baseUrl: 'https://api.webion.it/contactus' })
      }}
    >
      <App />
    </ApiWrapper>
  </StrictMode>
);
