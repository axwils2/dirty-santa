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

import { GiftService } from 'services/api';
import { useNotification } from 'hooks';

import type { Gift } from 'types/GiftTypes';

const useStyles = makeStyles(theme => ({
  form: {
    padding: theme.spacing(2)
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '252px'
  },
  hidden: {
    display: 'none'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  imageLabel: {
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

const GiftForm = ({ gift }: { gift: ?Gift }): React$Node => {
  const [editableGift, setEditableGift] = useState(gift);
  const [avatar, setAvatar] = useState(null);
  const classes = useStyles();
  const { notify } = useNotification();

  const submitForm = () => {
    if (!gift || !editableGift) return;

    // const updates = {};
    const formData = {};
    Object.keys(editableGift).forEach(key => {
      const value = editableGift[key];
      
      if (value !== gift[key]) {
        formData.append(key, value);
      }
    });

    GiftService.update(gift.id, formData)
      .then(response => {
        notify('Gift has been updated!');
      });
  };

  const updateGift = e => {
    setEditableGift(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updateImage = e => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    // GiftImageService.create(gift, formData)
    //   .then(response => {
    //     notify('Gift has been updated!');
    //     setEditableGift(prev => ({ ...prev, avatarUrl: response.avatarUrl }))
    //   });
  };

  if (!gift || !editableGift) return null;

  return (
    <Paper className={classes.form}>
      <Typography variant='h5' gutterBottom>Player Information</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <div className={classes.imageContainer}>
            <Avatar
              className={classes.image}
              src={editableGift.imageUrl}
              alt={editableGift.title}
              variant='rounded'
            />
            <input
              accept="image/*"
              className={classes.hidden}
              onChange={updateImage}
              name='image'
              id="image-button"
              type="file"
            />
            <label htmlFor="image-button" className={classes.imageLabel}>
              <PhotoCamera />
            </label>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label='Name'
            value={editableGift.title}
            name='name'
            onChange={updateGift}
            margin='normal'
            fullWidth
          />
          <TextField
            label='Email'
            value={editableGift.description}
            name='email'
            multiline
            onChange={updateGift}
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

export default GiftForm;
