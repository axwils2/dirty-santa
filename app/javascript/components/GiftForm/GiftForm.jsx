// @flow
import React, { useState, useEffect } from 'react';
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
    height: '400px'
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

const GiftForm = ({ gift, onSubmit }: { gift?: ?Gift, onSubmit: Gift => void }): React$Node => {
  const [editableGift, setEditableGift] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    GiftService.newGift()
      .then(response => setEditableGift(response))
  }, []);

  const submitForm = () => {
    if (!editableGift) return;

    // $FlowFixMe
    onSubmit(editableGift);
  };

  const updateGift = e => {
    setEditableGift(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updateImage = e => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    setEditableGift(prev => ({
      ...prev,
      image: e.target.files[0],
      imageUrl: URL.createObjectURL(e.target.files[0])
    }))
  };

  if (!editableGift) return null;

  return (
    <>
      <Typography variant='h5' gutterBottom>Gift Information</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label='Title'
            value={editableGift.title || ''}
            name='title'
            onChange={updateGift}
            margin='normal'
            fullWidth
          />
          {/* <TextField
            label='Secret Gift Card Description'
            value={editableGift.description || ''}
            name='description'
            onChange={updateGift}
            margin='normal'
            fullWidth
          /> */}
        </Grid>
        <Grid item xs={12}>
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
    </>
  )
};

export default GiftForm;
