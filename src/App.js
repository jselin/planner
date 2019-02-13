import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Modal, Button, Navbar, Nav, NavItem } from 'react-bootstrap';
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
      isSignedIn: false,
      showLogin: false,
    }
  }
  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => this.setState({
        isSignedIn: !!user,
        showLogin: false,
      })
    );
  }
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  handleCloseLogin = () => {
    this.setState({ showLogin: false });
  }

  handleSignIn = () => {
    if (this.state.isSignedIn == true) {
      firebase.auth().signOut();
    } else {
      this.setState({ showLogin: true });
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
                <Nav pullRight>
                  <NavItem onClick={this.handleSignIn}>
                    {this.state.isSignedIn ? "Sign out" : "Sign in"}
                  </NavItem>
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
        <LoginModal
          showLogin={this.state.showLogin}
          handleClose={this.handleCloseLogin}
        />
      </div>
    );
  }
}

const LoginModal = (props) => {
  return (
    <div>
      <Modal show={props.showLogin} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',

  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  //signInSuccessUrl: '/signedIn',

  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false
  },

  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ]
};

export default App;
