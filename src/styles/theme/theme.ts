import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#bb86fc',
      dark: '#8660b5',
      light: '#c199f3',
      contrastText: 'rgba(2,2,2,0.87)',
    },
    secondary: {
      main: '#03dac6',
      light: 'rgb(53, 225, 209)',
      dark: 'rgb(2, 152, 138)',
      contrastText: 'rgba(0, 0, 0, 0.87)',
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
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
  },
  typography: {
    // fontFamily: ['Monaco'].join(','),
  },
});

export default theme;
