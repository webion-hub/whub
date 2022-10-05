import { Theme } from '@mui/system';
import { createTheme } from '@mui/material/styles';
import { getComponents } from './components';

import * as _ from '@mui/material/styles/createPalette';
import { darkPalette } from './darkTheme';
import { lightPalette } from './lightTheme';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    'first-action': true;
  }
}

const fontFamily = "'Inter', sans-serif;";

const getTheme = (palette: Theme['palette']) => {
  return createTheme({
    palette: palette,
    layoutMaxWidth: {
      appbar: 1600,
      footer: 1270,
      section: 1600,
    },
    mixins: {
      toolbar: {
        height: 64,
      },
    },
    typography: {
      fontFamily: [fontFamily, 'sans-serif'].join(','),
      h1: { fontWeight: 700 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 700 },
      h4: { fontWeight: 700 },
      h5: { fontWeight: 700 },
      h6: { fontWeight: 700 },
      caption: { fontWeight: 600 },
    },
    transitions: {
      duration: {
        enteringScreen: 550,
      },
    },
    components: getComponents(fontFamily),
  });
};

export const darkTheme = getTheme(darkPalette);
export const lightTheme = getTheme(lightPalette);
