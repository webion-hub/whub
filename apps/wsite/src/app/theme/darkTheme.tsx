import { createTheme } from "@mui/material/styles";
import ReadexPro from "../../assets/fonts/ReadexPro-VariableFont_wght.ttf"

import "@mui/material/styles/createPalette";

const fontFamily = "'ReadexPro'"

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000001",
      paper: "#060E2B",
    },
    secondaryBackground: {
      default: '#000000',
    },
    primary: {
      main: "#1f4bff",
    },
    secondary: {
      main: "#81FF05",
      contrastText: '#333'
    },
    layout: {
      footer: '#000',
      appbar: '#000001'
    },
    text: {
      primary: "#fff",
      secondary: "rgba(255, 255, 255, 0.8)",
    },
    info: {
      main: "#999999",
      contrastText: '#fff'
    },
  },
  layoutMaxWidth: {
    appbar: 1200,
    footer: 1270,
    section: 1600,
  },
  mixins: {
    toolbar: {
      height: 64,
    }
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
          boxShadow: 'none',
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


darkTheme.typography.h1 = {
  fontFamily: fontFamily,
  [darkTheme.breakpoints.up("md")]: {
    fontSize: "70px",
  },
  [darkTheme.breakpoints.down("md")]: {
    fontSize: "55px",
  },
  [darkTheme.breakpoints.down("sm")]: {
    fontSize: "38px",
  },
};

darkTheme.typography.h2 = {
  fontFamily: fontFamily,
  [darkTheme.breakpoints.up("md")]: {
    fontSize: "42px",
  },
  [darkTheme.breakpoints.down("md")]: {
    fontSize: "36px",
  },
  [darkTheme.breakpoints.down("sm")]: {
    fontSize: "28px",
  },
};

darkTheme.typography.h3 = {
  fontFamily: fontFamily,
  [darkTheme.breakpoints.up("md")]: {
    fontSize: "38px",
  },
  [darkTheme.breakpoints.down("md")]: {
    fontSize: "32px",
  },
  [darkTheme.breakpoints.down("sm")]: {
    fontSize: "26px",
  },
};

darkTheme.typography.h4 = {
  fontFamily: fontFamily,
  [darkTheme.breakpoints.up("md")]: {
    fontSize: "32px",
  },
  [darkTheme.breakpoints.down("md")]: {
    fontSize: "28px",
  },
  [darkTheme.breakpoints.down("sm")]: {
    fontSize: "23px",
  },
};

darkTheme.typography.body1 = {
  fontFamily: fontFamily,
  [darkTheme.breakpoints.up("md")]: {
    fontSize: "22px",
  },
  [darkTheme.breakpoints.down("md")]: {
    fontSize: "20px",
  },
  [darkTheme.breakpoints.down("sm")]: {
    fontSize: "17px",
  },
};

darkTheme.typography.body2 = {
  fontFamily: fontFamily,
  [darkTheme.breakpoints.up("md")]: {
    fontSize: "19px",
  },
  [darkTheme.breakpoints.down("md")]: {
    fontSize: "16px",
  },
  [darkTheme.breakpoints.down("sm")]: {
    fontSize: "15px",
  },
};

darkTheme.typography.caption = {
  fontFamily: fontFamily,
  [darkTheme.breakpoints.up("md")]: {
    fontSize: "14px",
  },
  [darkTheme.breakpoints.down("md")]: {
    fontSize: "13px",
  },
  [darkTheme.breakpoints.down("sm")]: {
    fontSize: "12px",
  },
}

export default darkTheme;
