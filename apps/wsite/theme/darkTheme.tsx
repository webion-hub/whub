import { Theme } from '@mui/system';

export const darkPalette: Theme['palette'] = {
  mode: 'dark',
  background: {
    default: '#020515',
    paper: '#010104',
  },
  secondaryBackground: {
    default: '#000000',
  },
  primary: {
    main: '#1f4bff',
  },
  secondary: {
    main: '#9face2',
    contrastText: '#333',
  },
  layout: {
    footer: '#010104',
    appbar: '#010104',
  },
  text: {
    primary: '#fff',
    secondary: 'rgba(255, 255, 255, 0.8)',
  },
  info: {
    main: '#4444aa',
    contrastText: '#fff',
  },
};
