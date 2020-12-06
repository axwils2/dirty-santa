// @flow
import React, { useState } from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import isEmpty from 'lodash/isEmpty';

import { useIsOpen } from 'hooks';

const NotificationContext: Object = React.createContext<{
  isOpen: boolean,
  open: () => void,
  close: () => void,
  message: ?string,
  setMessage: ?string => void
}>({
  isOpen: false,
  open,
  close,
  message: null,
  setMessage: string => {}
});

export default NotificationContext;

const StyledSnackbarContent = withStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(1, 4, 1, 2),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    [theme.breakpoints.down('xs')]: {
      maxWidth: 'none'
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: '400px'
    }
  },
  action: {
    position: 'absolute',
    top: 4,
    right: 12
  }
}))(SnackbarContent);

export const NotificationProvider = ({ children }: { children: React$Node }): React$Node => {
  const { isOpen, open, close } = useIsOpen(false);
  const [message, setMessage] = useState(null);
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('xs'));

  const onClose = (event, reason) => {
    if (reason === 'clickaway') return;

    close(() => setMessage(null));
  }

  const anchorOrigin = isMobileView ? {
    vertical: 'top',
    horizontal: 'center'
  } : {
    vertical: 'bottom',
    horizontal: 'left'
  };

  const SlideTransition = props => (
    <Slide {...props} direction={isMobileView ? 'down' : 'up'} />
  );

  const value = {
    isOpen,
    open,
    message,
    setMessage
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <Snackbar
        open={isOpen}
        onClose={onClose}
        TransitionComponent={SlideTransition}
        key={message}
        autoHideDuration={5000}
        disableWindowBlurListener
        anchorOrigin={anchorOrigin}
      >
        <StyledSnackbarContent
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size='small'
              onClick={onClose}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
          message={message}
        />
      </Snackbar>
    </NotificationContext.Provider>
  );
};
