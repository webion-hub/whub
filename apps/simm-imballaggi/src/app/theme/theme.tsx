import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import Inter from "../../assets/fonts/Inter.ttf"

const fontFamily = "'Inter'"

const normTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#FFFFFF",
      paper: '#f5f6f7'
    },
    primary: {
      main: "#C80015",
    },
    secondary: {
      main: "#303f9f"
    },
    secondaryBackground: {
      default: "#F7F7F7"
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
    MuiPaper: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          border: '1px solid #e0e0e0',
          borderRadius: 8
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          boxShadow: '0px -1px 8px #e0e0e0',
          borderTop: '1px solid #e0e0e0'
        }
      }
    }
  }
});
const theme = responsiveFontSizes(normTheme);

export default theme
