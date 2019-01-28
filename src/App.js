import React, { Component } from 'react';
import './App.css';
import Weight from './Weight.js';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { IndexLinkContainer } from "react-router-bootstrap";
import Header from './Header.js'


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
                  <IndexLinkContainer to="/calculator">
                    <NavItem>Demand</NavItem>
                  </IndexLinkContainer>
                  <IndexLinkContainer to="/weight">
                    <NavItem>Weights</NavItem>
                  </IndexLinkContainer>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
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
