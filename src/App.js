import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer } from "react-router-bootstrap";

import './App.css';

import Home from './Home.js';
import Demand from './Demand.js';
import Weight from './Weight.js';
import Plan from './Plan.js';


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
              <Navbar.Header>
                <IndexLinkContainer to="/">
                  <Navbar.Brand>
                    Texdesigners
                </Navbar.Brand>
                </IndexLinkContainer>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                  <IndexLinkContainer to="/">
                    <NavItem>Home</NavItem>
                  </IndexLinkContainer>
                  <IndexLinkContainer to="/weight">
                    <NavItem>Weights</NavItem>
                  </IndexLinkContainer>
                  <IndexLinkContainer to="/demand">
                    <NavItem>Demand</NavItem>
                  </IndexLinkContainer>
                  <IndexLinkContainer to="/plan">
                    <NavItem>Plan</NavItem>
                  </IndexLinkContainer>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <Route exact path="/" component={Home} />
            <Route path="/demand" component={Demand} />
            <Route path="/weight" component={Weight} />
            <Route path="/plan" component={Plan} />
          </div>
        </Router>
        <p className="Bottom-legend">
          Copyright Jari Selin <a href="mailto:yarnweightcalculator@selinf.fi">Send feedback</a>
        </p>
      </div>
    );
  }
}

export default App;
