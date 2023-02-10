import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          borderRadius: "50px"
        }
      }
    }
  }
});

export default theme
