import { createTheme } from "@mui/material/styles";
import ReadexPro from "../../assets/fonts/ReadexPro-VariableFont_wght.ttf"

import "@mui/material/styles/createPalette";

const fontFamily = "'ReadexPro'"

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#040A20",
      paper: "#060E2B",
    },
    secondaryBackground: {
      default: '#020612',
    },
    primary: {
      main: "#1f4bff",
    },
    secondary: {
      main: "rgba(255,255,255,0.1)",
      contrastText: '#fff'
    },
    layout: {
      footer: '#000',
      appbar: '#040A20'
    },
    text: {
      primary: "rgba(255, 255, 255, 0.8)",
      secondary: "#fff",
    },
    info: {
      main: "#999999",
    },
  },
  typography: {
    fontFamily: [fontFamily, "sans-serif"].join(','),
    h1: { fontSize: "80px" },
    h2: { fontSize: "42px" },
    h3: { fontSize: "43px" },
    h4: { fontSize: "32px" },
    body1: { fontSize: "22px" },
    body2: { fontSize: "19px" },
    subtitle2: { fontSize: "17px" },
  },
  transitions: {
    duration: {
      enteringScreen: 550
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "@font-face": {
          fontFamily: fontFamily,
          src: `url(${ReadexPro}) format('truetype')`
        }
      }
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: "capitalize"
        },
        sizeLarge: {
          paddingBlock: 12
        },
      }
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          borderRadius: 32
        },
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
          maxWidth: 250,
          width: '100%'
        }
      }
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: "16px !important"
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: fontFamily,
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontSize: '18px !important',
        },
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '18px !important',
        }
      }
    }
  }
});


theme.typography.h1 = {
  fontFamily: fontFamily,
  [theme.breakpoints.up("md")]: {
    fontSize: "80px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "60px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "40px",
  },
};

theme.typography.h2 = {
  fontFamily: fontFamily,
  [theme.breakpoints.up("md")]: {
    fontSize: "42px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "36px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "28px",
  },
};

theme.typography.h3 = {
  fontFamily: fontFamily,
  [theme.breakpoints.up("md")]: {
    fontSize: "38px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "32px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "26px",
  },
};

theme.typography.h4 = {
  fontFamily: fontFamily,
  [theme.breakpoints.up("md")]: {
    fontSize: "32px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "28px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "23px",
  },
};

theme.typography.body1 = {
  fontFamily: fontFamily,
  [theme.breakpoints.up("md")]: {
    fontSize: "22px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "20px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "17px",
  },
};

theme.typography.body2 = {
  fontFamily: fontFamily,
  [theme.breakpoints.up("md")]: {
    fontSize: "19px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "16px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "15px",
  },
};

theme.typography.caption = {
  fontFamily: fontFamily,
  [theme.breakpoints.up("md")]: {
    fontSize: "14px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "13px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
  },
}

export default theme;
