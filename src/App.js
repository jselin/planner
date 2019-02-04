import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { IndexLinkContainer } from "react-router-bootstrap";

import Weight from './Weight.js';
import Header from './Header.js';
import Demand from './Demand.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navbar fluid collapseOnSelect>
                <IndexLinkContainer to="/">
                  <Navbar.Brand>
                    Texdesigners
                </Navbar.Brand>
                </IndexLinkContainer>
                <Navbar.Toggle />
              <Navbar.Collapse>
                <Nav>
                  <IndexLinkContainer to="/">
                    <Nav.Item>Home</Nav.Item>
                  </IndexLinkContainer>
                  <IndexLinkContainer to="/demand">
                    <Nav.Item>Demand</Nav.Item>
                  </IndexLinkContainer>
                  <IndexLinkContainer to="/weight">
                    <Nav.Item>Weights</Nav.Item>
                  </IndexLinkContainer>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/demand" component={Demand} />
            <Route path="/weight" component={Weight} />
          </div>
        </Router>
        <p className="Bottom-legend">
          Copyright Jari Selin <a href="mailto:yarnweightcalculator@selinf.fi">Send feedback</a>
        </p>
      </div>
    );
  }
}
function Home(props) {
  return (
    <div>
      <Header header="Home" />
      <p>
        This is the greatest site on earth.
      </p>
    </div >
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
