import React from 'react';
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';

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
        <meta charset="utf-8">
        <meta name="description" content="What will you tweet next? Enter a twitter handle and it will analyse the account to create funny parody tweets.">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <title>Your Next Tweet - what will you tweet next</title>
        <script data-js-intial-state>window.__APP_INITIAL_STATE__ = ${JSON.stringify(initialState)}</script>
        <link rel="shortcut icon" href="/static/images/favicon.ico">
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
