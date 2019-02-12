import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer } from "react-router-bootstrap";
import { StyledFirebaseAuth } from 'react-firebaseui';

import './App.css';

import firebase from './firebase.js'

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
                  <IndexLinkContainer to="/signin">
                    <NavItem>Signin</NavItem>
                  </IndexLinkContainer>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <Route exact path="/" component={Home} />
            <Route path="/demand" component={Demand} />
            <Route path="/weight" component={Weight} />
            <Route path="/plan" component={Plan} />
            <Route path="/signin" component={SignInScreen} />
          </div>
        </Router>
        <p className="Bottom-legend">
          Copyright Jari Selin <a href="mailto:yarnweightcalculator@selinf.fi">Send feedback</a>
        </p>
      </div>
    );
  }
}

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ]
};

class SignInScreen extends Component {
  render() {
    return (
      <div>
        <h1>My App</h1>
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
    );
  }
}

export default App;
