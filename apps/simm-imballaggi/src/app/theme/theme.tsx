import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import Inter from "../../assets/fonts/Inter.ttf"

const fontFamily = "'Inter'"

let theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#FFFFFF",
    },
    primary: {
      main: "#FF031D",
    },
    secondary: {
      main: "#A5A5A5"
    },
    layout: {
      footer: '#E4E7EB'
    }
  },
  typography: {
    fontFamily: [fontFamily, "sans-serif"].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@font-face": {
          fontFamily: fontFamily,
          src: `url(${Inter}) format('truetype')`
        }
      }
    },
  }
});
theme = responsiveFontSizes(theme);

export default theme
