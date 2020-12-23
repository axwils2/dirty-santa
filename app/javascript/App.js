// @flow
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';

import { ThemeProvider } from 'components/Theme';
import { NotificationProvider } from 'components/Notification';
import PlayerRegistration from 'pages/PlayerRegistration';
import GiftList from 'pages/GiftList';
import PlayerList from 'pages/PlayerList';

import * as ROUTES from 'constants/routes';

const App = (): React$Node => (
  <Router>
    <ThemeProvider>
      <CssBaseline />
      <NotificationProvider>
        <Switch>
          <Route path={ROUTES.PLAYER_REGISTRATION} component={PlayerRegistration} />
          <Route path='/game-admin' render={props => <GiftList admin {...props} />} />
          <Route path='/players' component={PlayerList} />
          <Route path='/' component={GiftList} />
        </Switch>
      </NotificationProvider>
    </ThemeProvider>
  </Router>
);

export default App;
