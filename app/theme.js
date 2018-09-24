export default {
  typography: {
    fontFamily: 'Montserrat, "Helvetica Neue", Helvetica, Arial, sans-serif',
    fontSize: 14,
  },
  palette: {
    primary: {
      light: '#9fffe0',
      main: '#69f0ae',
      dark: '#2bbd7e',
      contrastText: '#fff',
    },
    secondary: {
      light: '#b5ffff',
      main: '#80d8ff',
      dark: '#49a7cc',
      contrastText: '#fff',
    },
  },
  overrides: {
    MuiListItemIcon: {
      root: {
        color: undefined,
      },
    },
  },
};
