// @flow
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';

import { ThemeProvider } from 'components/Theme';
import SignIn from 'pages/SignIn';

import * as ROUTES from 'constants/routes';

const App = (): React$Node => (
  <Router>
    <ThemeProvider>
      <CssBaseline />
      <Switch>
        <Route path={ROUTES.SIGN_IN} component={SignIn} />
      </Switch>
    </ThemeProvider>
  </Router>
);

export default App;
