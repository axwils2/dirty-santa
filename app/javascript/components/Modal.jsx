// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: '#fff',
    [theme.breakpoints.down('sm')]: {
      maxHeight: '100vh'
    },
    [theme.breakpoints.up('md')]: {
      maxHeight: '80vh'
    },
    height: '100%',
    padding: theme.spacing(0),
    borderRadius: '4px',
    position: 'relative',
    '&:focus': {
      outline: 'none'
    }
  },
  content: {
    padding: theme.spacing(0, 4),
    height: 'calc(100% - 64px)',
    overflowY: 'scroll',
    width: '100%'
  },
  backdrop: {
    opacity: 0.9
  },
  spacer: {
    height: '32px',
    width: '100%'
  },
  closeIcon: {
    position: 'absolute',
    top: 6,
    right: 6
  }
}));

export type ModalProps = {
  isOpen: boolean,
  onClose: () => void,
  children?: React$Node,
  maxWidth?: 'sm' | 'md' | 'lg'
}

const MaterialModal = ({ isOpen, onClose, children, maxWidth = 'md' }: ModalProps): React$Node => {
  const classes = useStyles();

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      className={classes.modal}
      BackdropProps={{ className: classes.backdrop }}
    >
      <Fade in={isOpen}>
        <Container maxWidth={maxWidth} className={classes.paper}>
          <IconButton size='small' className={classes.closeIcon} onClick={onClose}>
            <CloseIcon fontSize='inherit' />
          </IconButton>
          <div className={classes.spacer} />
          <div className={classes.content}>
            {children}
          </div>
          <div className={classes.spacer} />
        </Container>
      </Fade>
    </Modal>
  )
};

export default MaterialModal;
