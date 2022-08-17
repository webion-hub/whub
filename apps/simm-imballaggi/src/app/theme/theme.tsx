import { alpha, createTheme, responsiveFontSizes } from '@mui/material/styles';
import Inter from "../../assets/fonts/Inter.ttf"

const fontFamily = "'Inter'"
const border = "1px solid #e0e0e0"

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
  mixins: {
    toolbar: {
      height: 64,
      maxWidth: 1600,
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
          borderRadius: 8
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          boxShadow: '0px -3px 4px -2px #e0e0e0',
          borderTop: border
        }
      }
    },
    MuiAutocomplete: {
      styleOverrides: {
        option: {
          borderBottom: border,
        },
        groupLabel: {
          background: alpha('#000', 0.05),
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
