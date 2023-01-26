import { Theme } from '@mui/system';
import { getTheme } from '../utils/getTheme';

export const darkPalette: Theme['palette'] = {
  mode: 'dark',
  background: {
    default: '#010104',
    paper: '#020515',
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

export const darkTheme = getTheme(darkPalette, 'dark');
