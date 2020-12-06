// @flow
import React, { useContext } from 'react';

import NotificationContext from 'components/Notification';

type UseNotificationType = {
  notify: string => void,
  closeNotification: () => void
};

const useNotification = (): UseNotificationType => {
  const { open, close, setMessage } = useContext(NotificationContext);

  const notify = (message: string) => {
    setMessage(message);
    open();
  };

  return {
    notify,
    closeNotification: close
  }
};

export default useNotification;
