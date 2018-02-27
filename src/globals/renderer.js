import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import Routes from './Routes';

import Header from './templates/header';

export default (req, initialState, context) => {
  const content = renderToString(
    <StaticRouter location={req.path} context={context}>
      <Routes/>
    </StaticRouter>
  );

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <script data-js-intial-state>window.__APP_INITIAL_STATE__ = ${JSON.stringify(initialState)}</script>
        <link rel="stylesheet" href="/static/css/main.css"/>
      </head>
      <body>
        ${Header}
        <div id="app" class="app" class="u-page-grid">${content}</div>
        <script src="/static/js/vendor.js"></script>
        <script src="/static/js/bundle.js"></script>
      </body>
    </html>
  `.trim();
};
