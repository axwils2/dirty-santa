// @flow
import axios from 'axios';
import snakeCase from 'lodash/snakeCase';

const env = process.env.NODE_ENV;

const client: Object = axios.create({
  baseURL: `${window.location.origin}/api`
});

const request: Object = (options: { skipDefaultHandling?: boolean }) => {
  const onSuccess = response => {
    console.debug('Request Successful:', response);

    const data = response.data.data;

    if (Array.isArray(data)) {
      return data.map(d => d.attributes);
    } else {
      return response.data.data?.attributes;
    }
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

const snakeCaseKeys = (apiObject: {}): {} => {
  const newApiObject = {};
  Object.keys(apiObject).forEach(key => {
    const value = apiObject[key];
    newApiObject[snakeCase(key)] = value;
  });

  return newApiObject;
};

export { request as default, client, snakeCaseKeys };
