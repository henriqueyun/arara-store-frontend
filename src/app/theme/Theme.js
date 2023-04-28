import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  mode: "light",
  palette: {
    primary: {
      main: "#FFFFFF"
    },
    secondary: {
      main: "#323232"
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#AAAAAA",
      disabled: "#CCCCCC"
    },
    background: {
      default: "#FFFFFF",
      paper: "#323232"
    }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          borderRadius: "50px"
        }
      }
    }
  },
});

export default theme
