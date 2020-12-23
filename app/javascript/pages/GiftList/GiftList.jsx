// @flow
import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import actionCable from 'actioncable';

import FullPageBox from 'components/FullPageBox';
import GiftForm from 'components/GiftForm';
import Modal from 'components/Modal';
import { useIsOpen, useNotification } from 'hooks';
import { GiftService, GiftImageService, PlayerService } from 'services/api';

import type { Gift } from 'types/GiftTypes';

const CableApp = {};
CableApp.cable = actionCable.createConsumer(process.env.REACT_APP_CABLE_URL || 'ws://localhost:3000/cable');

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
    justifyContent: 'center',
    padding: theme.spacing(3)
  },
  gridTile: {
    position: 'relative'
  },
  complete: {
    position: 'absolute',
    zIndex: 5,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.secondary.main,
    opacity: 0.9,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

const GiftList = ({ admin }: { admin?: boolean }): React$Node => {
  const [gifts, setGifts] = useState<Array<Gift>>([]);
  const [players, setPlayers] = useState([]);
  const [activeGift, setActiveGift] = useState(null);
  const { isOpen, open, close } = useIsOpen(false);
  const { notify } = useNotification();
  const classes = useStyles();
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    GiftService.list()
      .then(response => {
        setGifts(response)
      })

    PlayerService.list()
      .then(response => {
        setPlayers(response)
      })

    const channel = CableApp.cable.subscriptions.create(
      { channel: 'GiftsChannel' },
      {
        received: response => {
          if (admin) return;

          const updatedGift = response.data.attributes;

          setGifts(prev => {
            const safeGifts = [...prev];
            const index = prev.findIndex(gift => gift.id === updatedGift.id);
            safeGifts[index] = updatedGift;

            return safeGifts;
          });
        }
      }
    )

    return () => channel.unsubscribe();
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

  const updateGift = e => {
    if (!activeGift) return;
    if (activeGift.stealCountRemaining === 0) return;

    const receiverId = e.target.value;

    GiftService.update(activeGift.id, { receiverId, stealCountRemaining: activeGift.stealCountRemaining - 1 })
      .then(response => {
        const safeGifts = [...gifts];
        const index = gifts.findIndex(gift => gift.id === response.id);
        safeGifts[index] = response;

        setGifts(safeGifts);
        setActiveGift(null);
      })
  };

  return (
    <>
      <FullPageBox className={classes.root}>
        <Container maxWidth="md">
          <GridList cols={isMobileView ? 1 : 3} cellHeight={400} spacing={16} className={classes.gridList}>
            {gifts.map(gift => {
              const receiver = players.find(player => player.id === gift.receiverId);
              const stealCountRemaining = gift.stealCountRemaining;
              const canUpdate = stealCountRemaining > 0 && admin;

              return (
                <GridListTile key={gift.id} classes={{ root: classes.gridTile }}>
                  <img src={gift.imageUrl} alt={gift.title} />
                  {stealCountRemaining === 0 && (
                    <div className={classes.complete}>
                      <Typography variant='h4' style={{ color: '#fff' }}>SAFE!</Typography>
                    </div>
                  )}
                  <GridListTileBar
                    title={gift.title}
                    subtitle={`Steals Remaining: ${stealCountRemaining}`}
                    actionIcon={
                      <div style={{ cursor: canUpdate ? 'pointer' : 'not-allowed' }} onClick={() => canUpdate && setActiveGift(gift)}>
                        <Tooltip title={receiver?.name || ''}>
                          <Avatar
                            src={receiver?.avatarUrl}
                            style={{ zIndex: 10 }}
                          />
                        </Tooltip>
                      </div>
                    }
                  />
                </GridListTile>
              )
            })}
            {admin && (
              <GridListTile>
                <div className={classes.addNew}>
                <Button color='secondary' onClick={open}>Add New Gift</Button>
                </div>
              </GridListTile>
            )}
          </GridList>
        </Container>
      </FullPageBox>
      <Modal
        isOpen={!!activeGift}
        onClose={() => setActiveGift(null)}
        maxWidth='sm'
      >
        <Select
          id="demo-simple-select"
          value={activeGift?.receiverId}
          onChange={updateGift}
          style={{ width: '100%' }}
        >
          {players.map(player => (
            <MenuItem value={player.id} key={player.id}>{player.name}</MenuItem>
          ))}
        </Select>
      </Modal>
      <Modal
        isOpen={isOpen}
        onClose={close}
        maxWidth='sm'
      >
        <GiftForm onSubmit={createGift} />
      </Modal>
    </>
  )
};

export default GiftList;
