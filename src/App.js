import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import TwitterHandle from './components/TwitterHandle';

class App extends Component {
  render() {
    return (
      <main className="app">
        <Router>
          <div className="app-router">
            <Route exact path="/" component={TwitterHandle}></Route>
            <Route exact path="/parody/:handle" component={()=>{}}></Route>
          </div>
        </Router>
      </main>
    );
  }
}

export default App;
