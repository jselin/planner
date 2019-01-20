import React, { Component } from 'react';
import './App.css';
import Weight from './Weight.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/weight">Yarn weight calculator</Link>
            </li>
          </ul>

          <hr />

          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/weight" component={Weight} />
        </div>
      </Router>
    );
  }
}
function Home(props) {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Texdesigners</h1>
      </header>
      <p className="Bottom-legend">
        Copyright Jari Selin <a href="mailto:yarnweightcalculator@selinf.fi">Give feedback</a>
      </p>
    </div>
  );
}
function About(props) {
  return (
    <div>
      <h2>About</h2>
    </div>

  );
}


export default App;
