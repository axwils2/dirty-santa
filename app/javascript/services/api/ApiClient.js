// @flow
import axios from 'axios';

const env = process.env.NODE_ENV;

const client: Object = axios.create({
  baseURL: `${window.location.origin}/api`
});

const request: Object = (options: { skipDefaultHandling?: boolean }) => {
  const onSuccess = response => {
    console.debug('Request Successful:', response);
    return response.data.data.attributes;
  };

  const onError = error => {
    if (env === 'test') {
      console.error('Network Request:', error.config.url);
      return;
    }
    console.error('Request Failed:', error.config);

    // Request was made but server responded with something other than 2xx
    if (error.response) {
      console.groupCollapsed('status, data, headers');
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
      console.groupEnd();
    }

    return Promise.reject(error.response || error.message);
  };

  // $FlowFixMe
  return client(options)
    .then(onSuccess)
    .catch(onError);
};

export { request as default, client };
