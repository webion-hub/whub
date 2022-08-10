import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#F8F9FA",
    },
    primary: {
      main: "#F8F9FA",
    },
    secondary: {
      main: "#FF031D",
    },
  }
});
theme = responsiveFontSizes(theme);

export default theme