// @flow
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import FullPageBox from 'components/FullPageBox';
import { PlayerService } from 'services/api';

import type { Match } from 'types/RouterTypes';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    padding: theme.spacing(2)
  }
}));

const PlayerGiftProfile = ({ match }: { match: Match }): React$Node => {
  const token = match.params.token;
  const classes = useStyles();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (!token) return;

    PlayerService.fetch(token)
      .then(response => {
        setPlayer(response);
      })
  }, [token]);

  if (!player) return null;

  return (
    <FullPageBox>
      <Grid container alignItems='center' justify='center' className={classes.root}>
        <Grid item sm={6} xs={12}>
          <Typography>Player Gift Profile</Typography>
        </Grid>
      </Grid>
    </FullPageBox>
  )
};

export default PlayerGiftProfile;
