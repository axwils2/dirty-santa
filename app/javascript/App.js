// @flow
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';

import { ThemeProvider } from 'components/Theme';
import PlayerGiftProfile from 'pages/PlayerGiftProfile';

import * as ROUTES from 'constants/routes';

const App = (): React$Node => (
  <Router>
    <ThemeProvider>
      <CssBaseline />
      <Switch>
        <Route path={ROUTES.PLAYER_PROFILE} component={PlayerGiftProfile} />
      </Switch>
    </ThemeProvider>
  </Router>
);

export default App;
