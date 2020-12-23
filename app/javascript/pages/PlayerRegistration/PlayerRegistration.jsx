// @flow
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import FullPageBox from 'components/FullPageBox';
import PlayerForm from 'components/PlayerForm';
import { PlayerService, PlayerAvatarService } from 'services/api';
import { useNotification } from 'hooks';

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

const PlayerRegistration = (): React$Node => {
  const [player, setPlayer] = useState(null);
  const { notify } = useNotification();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    PlayerService.newPlayer()
      .then(response => {
        setPlayer(response);
    })
  }, []);

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
            notify('Your information has been saved!');
            history.push(`/players/${response.token}`)
          })
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
