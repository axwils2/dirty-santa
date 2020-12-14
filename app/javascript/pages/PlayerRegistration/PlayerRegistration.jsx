// @flow
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import FullPageBox from 'components/FullPageBox';
import PlayerForm from 'components/PlayerForm';
import GiftForm from 'components/GiftForm';
import { PlayerService, PlayerAvatarService } from 'services/api';

import type { Match } from 'types/RouterTypes';
import type { Player } from 'types/PlayerTypes';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main
  },
  gridRoot: {
    height: '100%'
  },
}));

const PlayerRegistration = ({ match }: { match: Match }): React$Node => {
  const gameToken = match.params.gameToken;
  const [player, setPlayer] = useState(null);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (!gameToken) return;

    PlayerService.newPlayer({ game_token: gameToken })
      .then(response => {
        setPlayer(response);
      })
  }, [gameToken]);

  const onSubmit = (savedPlayer: Player) => {
    PlayerService.create(savedPlayer)
      .then(response => {
        if (savedPlayer.avatar) {
          const formData = new FormData();
          formData.append('avatar', savedPlayer.avatar);

          PlayerAvatarService.create(
            response.token,
            formData
          ).then(() => {
            history.push(`/players/${response.token}`)
          })
        } else {
          history.push(`/players/${response.token}`)
        }
      })
  }

  if (!player) return null;

  return (
    <FullPageBox className={classes.root}>
      <Container maxWidth={'sm'}>
        <Grid container spacing={2} className={classes.gridRoot}>
          <Grid item xs={12}>
            <PlayerForm
              player={player}
              onSubmit={onSubmit}
            />
          </Grid>
        </Grid>
      </Container>
    </FullPageBox>
  )
};

export default PlayerRegistration;
