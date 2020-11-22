// @flow
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';

import { ThemeProvider } from 'components/Theme';

const App = (): React$Node => (
  <Router>
    <ThemeProvider>
      <CssBaseline />
      <div>Hello World</div>
    </ThemeProvider>
  </Router>
);

export default App;
