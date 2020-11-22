// @flow
import React from 'react'
import ReactDOM from 'react-dom'

import App from 'App';

document.addEventListener('DOMContentLoaded', () => {
  if (document.body) {
    ReactDOM.render(
      <App />,
      document.body.appendChild(document.createElement('div')),
    );
  }
})
