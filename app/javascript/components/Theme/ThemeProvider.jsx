// @flow
import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import theme from './theme';

const ThemeProvider = ({ children }: { children: React$Node }): React$Node => {
  return (
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
