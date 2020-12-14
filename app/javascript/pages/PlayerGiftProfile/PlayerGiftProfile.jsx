// @flow
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import FullPageBox from 'components/FullPageBox';
import PlayerForm from 'components/PlayerForm';
import GiftForm from 'components/GiftForm';
import { PlayerService, PlayerAvatarService, GiftService, GiftImageService } from 'services/api';
import { useNotification } from 'hooks';

import type { Match } from 'types/RouterTypes';
import type { Player } from 'types/PlayerTypes';
import type { Gift } from 'types/GiftTypes';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    overflowY: 'scroll'
  },
  gridRoot: {
    height: '100%'
  },
}));

const PlayerGiftProfile = ({ match }: { match: Match }): React$Node => {
  const token = match.params.token;
  const [player, setPlayer] = useState(null);
  const [gift, setGift] = useState(null);
  const classes = useStyles();
  const { notify } = useNotification();

  useEffect(() => {
    if (!token) return;

    PlayerService.fetch(token)
      .then(response => {
        setPlayer(response);
      })
    
    GiftService.fetch(token)
      .then(response => {
        if (!response) {
          GiftService.newGift(token)
            .then(newGift => {
              setGift(newGift);
            })
        } else {
          setGift(response);
        }
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

  const onGiftSubmit = (savedGift: Gift) => {
    if (!player) return;

    const playerToken = player.token;
    if (!playerToken) return;

    if (savedGift && savedGift.id) {
      GiftService.update(playerToken, savedGift)
        .then(response => {
          if (savedGift.image) {
            const formData = new FormData();
            formData.append('image', savedGift.image);

            GiftImageService.update(savedGift.id, formData)
              .then(image => {
                setGift({ ...response, imageUrl: image.imageUrl });
                notify('Your gift has been updated!');
              })
          } else {
            setGift(response);
            notify('Your gift has been updated!');
          }
        })
    } else {
      if (!savedGift.image) {
        notify('You need an image for your gift!');
        return;
      }

      GiftService.create(playerToken, savedGift)
        .then(response => {
          const formData = new FormData();
          // $FlowFixMe
          formData.append('image', savedGift.image);
          GiftImageService.create(response.id, formData)
            .then(image => {
              setGift({ ...response, imageUrl: image.imageUrl });
              notify('Your gift has been added!');
            })
        })
    }
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
          {gift && (
            <Grid item xs={12}>
              <GiftForm
                gift={gift}
                onSubmit={onGiftSubmit}
              />
            </Grid>
          )}
        </Grid>
      </Container>
    </FullPageBox>
  )
};

export default PlayerGiftProfile;
