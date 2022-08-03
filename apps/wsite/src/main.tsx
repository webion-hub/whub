import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import ReactPixel from 'react-facebook-pixel';
import { App } from './app/App';

import './styles.css'


ReactPixel.init('1771971246478638');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <StrictMode>
    <App/>
  </StrictMode>
);