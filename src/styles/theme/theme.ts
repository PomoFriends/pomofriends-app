import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#bb86fc',
    },
    secondary: {
      main: '#03dac6',
    },
    error: {
      main: '#cf6679',
    },
    background: {
      default: '#121212',
      paper: '#424242',
    },
    warning: {
      main: '#f7bd64',
    },
    info: {
      main: '#6cb5ef',
    },
    success: {
      main: '#7be87c',
    },
  },
});

export default theme;
