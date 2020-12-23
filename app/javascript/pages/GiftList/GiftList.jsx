// @flow
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

import FullPageBox from 'components/FullPageBox';
import GiftForm from 'components/GiftForm';
import Modal from 'components/Modal';
import { useIsOpen, useNotification } from 'hooks';
import { GiftService, GiftImageService } from 'services/api';

import type { Gift } from 'types/GiftTypes';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    overflowY: 'scroll'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  addNew: {
    width: '100%',
    height: '100%',
    border: '4px dashed #000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const GiftList = ({ admin }: { admin?: boolean }): React$Node => {
  const [gifts, setGifts] = useState<Array<Gift>>([]);
  const { isOpen, open, close } = useIsOpen(false);
  const { notify } = useNotification();
  const classes = useStyles();

  useEffect(() => {
    GiftService.list()
      .then(response => {
        setGifts(response)
      })
  }, []);

  const createGift = gift => {
    GiftService.create(gift)
      .then(response => {
        const formData = new FormData();
        // $FlowFixMe
        formData.append('image', gift.image);
        GiftImageService.create(response.id, formData)
          .then(image => {
            const addedGift = { ...response, imageUrl: image.imageUrl };
            setGifts(prev => [...prev, addedGift]);
            close();
            notify('Gift has been added!');
          })
      })
  };

  return (
    <>
      <FullPageBox className={classes.root}>
        <GridList cellHeight={'auto'} className={classes.gridList}>
          {gifts.map(gift => (
            <GridListTile key={gift.id}>
              <img src={gift.imageUrl} alt={gift.title} />
              <GridListTileBar
                title={gift.title}
                subtitle={gift.receiverName && <span>by: {gift.receiverName}</span>}
                actionIcon={
                  <IconButton aria-label={`Update Gift`} className={classes.icon}>
                    <EditIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
          <GridListTile>
            <div className={classes.addNew}>
            <Button color='secondary' onClick={open}>Add New Gift</Button>
            </div>
          </GridListTile>
        </GridList>
      </FullPageBox>
      <Modal
        isOpen={isOpen}
        onClose={close}
      >
        <GiftForm onSubmit={createGift} />
      </Modal>
    </>
  )
};

export default GiftList;
