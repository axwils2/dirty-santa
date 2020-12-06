import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';

const theme: Object = createMuiTheme({
  palette: {
    primary: {
      light: '#60ad5e',
      main: '#2e7d32',
      dark: '#005005',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff5f52',
      main: '#c62828',
      dark: '#8e0000',
      contrastText: '#fff',
    }
  },
  props: {
    MuiButton: {
      variant: 'contained'
    },
    MuiTextField: {
      variant: 'outlined'
    },
    MuiFormControl: {
      variant: 'outlined'
    },
    MuiSelect: {
      variant: 'outlined'
    }
  }
});

export default theme;