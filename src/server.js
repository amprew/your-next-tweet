import 'babel-polyfill';

import * as dotenv from 'dotenv';
dotenv.config();

import fs from 'mz/fs';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

import React from 'react';

import renderer from './globals/renderer';
import externalAPI from './globals/api/external';
import Routes from './globals/Routes';

import * as babel from 'babel-core';

const babelConfig = JSON.parse(
  fs.readFileSync(
    path.resolve('.babelrc'),
    'utf8'
  )
);

babel.transform('code', babelConfig);

const server = express();
const PORT = (process.env.PORT || 3002);
const pageSelection = /^\/([^\/\.]\/?)*$/;

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

server.use('/static', express.static('dist/public'));

externalAPI(server);

server.get('*', (req, res) => {
  global.fullURL = `${req.protocol}://${req.get('host')}`;

  res.set({
    'Cache-Control': 'public, no-cache'
  });

  const context = {};
  const initialState = {};

  const content = renderer(
    req,
    initialState,
    context
  );

  if (context.url) {
    return res.redirect(301, context.url);
  }

  if (context.notFound) {
    res.status(404);
  }

  res.send(`${content}`);


  console.log(`URL requested: ${req.url}`);
});

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
