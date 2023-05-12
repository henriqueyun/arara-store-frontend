/* eslint-disable import/prefer-default-export */
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  mode: 'light',
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#323232',
    },
    warning: {
      main: '#FFD873',
    },
    text: {
      primary: '#000000',
      secondary: '#000000',
      disabled: '#CCCCCC',
    },
    background: {
      default: '#F5F5F5',
      paper: '#323232',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#F5F5F5',
          borderRadius: '50px',
        },
      },
    },
  },
});

export default theme;
