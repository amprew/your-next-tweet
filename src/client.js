import 'babel-polyfill';
import React from 'react';
import { hydrate } from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';

import Routes from './globals/Routes';

hydrate(
  <BrowserRouter>
    <Routes />
  </BrowserRouter>,
  document.querySelector('#app')
);
