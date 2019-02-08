import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Image, Grid, Col, Panel, PageHeader, Navbar, Nav, NavItem } from 'react-bootstrap';
import { IndexLinkContainer } from "react-router-bootstrap";

import './App.css';

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
      <Header header="Texdesigners" />
      <div className="home-container">
        <PageHeader>
          All about weaving!
        </PageHeader>
        <Panel>
          <Panel.Body>
            Welcome to your one stop shop to plan your weaving project.
            Let use guide you through selecting your yarns, calculating demand
            and creating a simple to follow plan. Down the line you will be able
            design your project here too. Stay tuned.
          </Panel.Body>
        </Panel>
        <Grid fluid>
          <Col md={4}>
            <Image rounded className="mx-auto d-block" src="/img/hector-j-rivas-1146142-unsplash.jpg" />
            <div class="centered">Weight</div>
          </Col>
          <Col md={4}>
            <Image rounded src="/img/soraya-garcia-1208513-unsplash.jpg"/>
            <div class="centered">Demand</div>
          </Col>
          <Col md={4}>
            <Image rounded src="/img/reija-huusko.jpg"/>
            <div class="centered">Plan</div>
          </Col>
        </Grid>
      </div>
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
