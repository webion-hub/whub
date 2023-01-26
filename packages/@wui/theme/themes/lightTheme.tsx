import { Theme } from '@mui/system';
import { getTheme } from '../utils/getTheme';

const lightPalette: Theme['palette'] = {
  mode: 'light',
  background: {
    default: '#fff',
    paper: '#fff',
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
    appbar: '#fff',
  },
  info: {
    main: '#999999',
    contrastText: '#444',
  },
};

export const lightTheme = getTheme(lightPalette, 'light');