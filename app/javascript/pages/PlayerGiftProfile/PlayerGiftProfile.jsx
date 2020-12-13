// @flow
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import FullPageBox from 'components/FullPageBox';
import PlayerForm from 'components/PlayerForm';
import GiftForm from 'components/GiftForm';
import { PlayerService, PlayerAvatarService } from 'services/api';
import { useNotification } from 'hooks';

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

const PlayerGiftProfile = ({ match }: { match: Match }): React$Node => {
  const token = match.params.token;
  const [player, setPlayer] = useState(null);
  const classes = useStyles();
  const { notify } = useNotification();

  useEffect(() => {
    if (!token) return;

    PlayerService.fetch(token)
      .then(response => {
        setPlayer(response);
      })
  }, [token]);

  const onPlayerSubmit = (savedPlayer: Player) => {
    PlayerService.update(token, savedPlayer)
      .then(response => {
        if (savedPlayer.avatar) {
          const formData = new FormData();
          formData.append('avatar', savedPlayer.avatar);

          PlayerAvatarService.update(token, formData)
            .then(avatar => {
              setPlayer({ ...response, avatarUrl: avatar.avatarUrl });
              notify('Your profile has been updated!');
            })
        } else {
          setPlayer(response);
          notify('Your profile has been updated!');
        }
      })
  };

  if (!player) return null;

  return (
    <FullPageBox className={classes.root}>
      <Container maxWidth={'sm'}>
        <Grid container spacing={2} className={classes.gridRoot}>
          <Grid item xs={12}>
            <PlayerForm
              player={player}
              onSubmit={onPlayerSubmit}
            />
          </Grid>
        </Grid>
      </Container>
    </FullPageBox>
  )
};

export default PlayerGiftProfile;
