import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#F8F9FA",
    },
    primary: {
      main: "#FF031D",
    },
    secondary: {
      main: "#A5A5A5"
    }
  }
});
theme = responsiveFontSizes(theme);

export default theme