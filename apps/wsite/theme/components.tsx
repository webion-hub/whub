import { Components, createTheme, Theme } from '@mui/material';

const defaultTheme = createTheme();

export const getComponents = (
  fontFamily: string,
  mode: 'light' | 'dark'
): Components<Omit<Theme, 'components'>> => ({
  MuiCssBaseline: {
    styleOverrides: {
      '@font-face': {
        fontFamily: fontFamily,
      },
    },
  },
  MuiAccordion: {
    styleOverrides: {
      root: {
        padding: 8,
        transition: '0.5s box-shadow',

        "&.Mui-expanded": {
          boxShadow: defaultTheme.shadows[10]
        }
      }
    }
  },
  MuiSnackbarContent: {
    styleOverrides: {
      root: {
        borderRadius: 16,
      },
    },
  },
  MuiButton: {
    variants: [
      {
        props: { variant: 'first-action' },
        style: {
          backdropFilter: 'blur(8px)',
          paddingBlock: 16,
          paddingInline: 24,
          background: 'rgba(255,255,255, 0.1)',
        },
      },
    ],
    styleOverrides: {
      root: {
        borderRadius: 999,
        textTransform: 'capitalize',
      },
      sizeLarge: {
        paddingBlock: 12,
      },
    },
  },
  MuiPaper: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: {
        backgroundImage: 'none',
        borderRadius: 16,
        border: mode === 'dark'
            ? '1px solid #10172d'
            : '1px solid #e2e7fa',
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: 'none',
        borderRadius: 0,
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        borderRadius: 0,
        maxWidth: 250,
        width: '100%',
      },
    },
  },
  MuiMenu: {
    styleOverrides: {
      paper: {
        borderRadius: '16px !important',
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        fontFamily: fontFamily,
      },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 10,
        fontSize: '18px !important',
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        fontSize: '18px !important',
      },
    },
  },
});
