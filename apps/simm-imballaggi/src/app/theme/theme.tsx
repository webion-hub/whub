import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#F8F9FA",
    },
    primary: {
      main: "#FF1A1A",
    },
    layout: {
      footer: '#E4E7EB'
    }
  }
});
theme = responsiveFontSizes(theme);

export default theme
