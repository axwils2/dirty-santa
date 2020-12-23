// @flow
import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography';

import FullPageBox from 'components/FullPageBox';
import { useNotification } from 'hooks';
import { PlayerService } from 'services/api';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    overflowY: 'scroll'
  },
  gridTile: {
    position: 'relative'
  },
}));

const PlayerList = ({ admin }: { admin?: boolean }): React$Node => {
  const [players, setPlayers] = useState([]);
  const { notify } = useNotification();
  const classes = useStyles();

  useEffect(() => {
    PlayerService.list()
      .then(response => {
        setPlayers(response)
      })
  }, []);

  return (
    <>
      <FullPageBox className={classes.root}>
        <Container maxWidth="md">
          <GridList cols={3} cellHeight={400} spacing={16} className={classes.gridList}>
            {players.map(player => {
              return (
                <GridListTile key={player.id} classes={{ root: classes.gridTile }}>
                  <img src={player.avatarUrl} alt={player.name} />
                  <GridListTileBar
                    title={player.name}
                  />
                </GridListTile>
              )
            })}
          </GridList>
        </Container>
      </FullPageBox>
    </>
  )
};

export default PlayerList;
