// @flow
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Avatar from '@material-ui/core/Avatar';

import type { Player } from 'types/PlayerTypes';

const useStyles = makeStyles(theme => ({
  form: {
    padding: theme.spacing(2)
  },
  avatarContainer: {
    position: 'relative',
    width: '100%',
    height: '252px'
  },
  hidden: {
    display: 'none'
  },
  avatar: {
    width: '100%',
    height: '100%'
  },
  avatarLabel: {
    position: 'absolute',
    cursor: 'pointer',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: theme.spacing(1)
  },
  submitButton: {
    float: 'right'
  }
}));

const PlayerForm = ({ player, onSubmit }: { player: Player, onSubmit: Player => void }): React$Node => {
  const [editablePlayer, setEditablePlayer] = useState(player);
  const [avatar, setAvatar] = useState(null);
  const classes = useStyles();

  const submitForm = () => {
    if (!editablePlayer) return;

    onSubmit(editablePlayer);
  };

  const updatePlayer = e => {
    setEditablePlayer(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updateAvatar = e => {
    const formData = new FormData();
    formData.append('avatar', e.target.files[0]);
    setEditablePlayer(prev => ({
      ...prev,
      avatar: e.target.files[0],
      avatarUrl: URL.createObjectURL(e.target.files[0])
    }))
  };

  if (!editablePlayer) return null;

  return (
    <Paper className={classes.form}>
      <Typography variant='h5' gutterBottom>Player Information</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant='overline'>Player Picture</Typography>
          <div className={classes.avatarContainer}>
            <Avatar
              className={classes.avatar}
              src={editablePlayer.avatarUrl}
              alt={editablePlayer.name}
              variant='rounded'
            />
            <input
              accept="image/*"
              className={classes.hidden}
              onChange={updateAvatar}
              name='avatar'
              id="avatar-button"
              type="file"
            />
            <label htmlFor="avatar-button" className={classes.avatarLabel}>
              <PhotoCamera />
            </label>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Name'
            value={editablePlayer.name || ''}
            name='name'
            onChange={updatePlayer}
            margin='normal'
            fullWidth
          />
          <TextField
            label='Email'
            value={editablePlayer.email || ''}
            name='email'
            onChange={updatePlayer}
            margin='normal'
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            color='primary'
            onClick={submitForm}
            className={classes.submitButton}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
};

export default PlayerForm;
