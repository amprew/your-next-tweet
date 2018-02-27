import React from 'react';
import { Switch, Route } from 'react-router';

import NotFound from '../pages/NotFound';
import TwitterHandle from '../pages/TwitterHandle';
import Parody from '../pages/Parody';

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={TwitterHandle} />
      <Route exact path="/parody/:handle" component={Parody} />
      <Route component={NotFound} />
    </Switch>
  );
};
