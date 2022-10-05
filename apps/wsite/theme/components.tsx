import { Components, Theme } from '@mui/material';

export const getComponents = (
  fontFamily: string
): Components<Omit<Theme, 'components'>> => ({
  MuiCssBaseline: {
    styleOverrides: {
      '@font-face': {
        fontFamily: fontFamily,
      },
    },
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
      elevation: 3,
    },
    styleOverrides: {
      root: {
        backgroundImage: 'none',
        borderRadius: 16,
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
