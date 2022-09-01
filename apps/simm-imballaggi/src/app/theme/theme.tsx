import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import Inter from "../../assets/fonts/Inter.ttf";

const fontFamily = "'Inter'"
export const border = "1px solid #e0e0e0"

const normTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#FFFFFF",
      paper: '#fcfdfd'
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
      footer: '#E4E7EB',
      appbar: '#F8F9FA',
    },
    border: {
      default: border,
    }
  },
  layoutMaxWidth: {
    appbar: 1400,
    footer: 1400,
    section: 1400,
  },
  mixins: {
    toolbar: {
      height: 64,
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
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: 'none',
          boxShadow: 'none',
          borderBottom: border,
        }
      }
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          border: border,
          borderRadius: 8,
          "& > .MuiButtonBase-root": {
            borderRadius: 8,
          }
        }
      }
    },
    MuiAutocomplete: {
      styleOverrides: {
        option: {
          borderBottom: border,
        },
        groupLabel: {
          background: '#f1f2f2',
        },
        paper: {
          borderTopRightRadius: '0px !important',
          borderTopLeftRadius: '0px !important',
          borderTop: 'none',
        }
      }
    }
  }
});
const theme = responsiveFontSizes(normTheme);

export default theme
