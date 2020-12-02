// @flow
import React from 'react';
import Box from '@material-ui/core/Box';

const FullPageBox = (props: *): React$Node => {
  const defaults = { width: '100vw', height: '100vh' };

  return (
    <Box
      { ...defaults }
      {...props}
    />
  );
};

export default FullPageBox;
