import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import * as dotenv from 'dotenv';

import TwitterHandle from './components/TwitterHandle';
import TweetList from './components/TweetList';

class App extends Component {
  componentWillMount() {
    dotenv.config();
  }

  render() {
    return (
      <main className="app">
        <Router>
          <div className="app-router">
            <Route exact path="/" component={TwitterHandle}></Route>
            <Route exact path="/parody/:handle" component={TweetList}></Route>
          </div>
        </Router>
      </main>
    );
  }
}

export default App;
