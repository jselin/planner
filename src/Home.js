import React, { Component } from 'react';
import { Image, Grid, Col, Panel, PageHeader } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";

import './Home.css';

//import Weight from './Weight.js';
import Header from './Header.js';
//import Demand from './Demand.js';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
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
            <ImageFormatter
              path="/weight"
              label="Weight"
              imageUrl="/img/hector-j-rivas-1146142-unsplash.jpg"
            />
            <ImageFormatter
              path="/demand"
              label="Demand"
              imageUrl="/img/soraya-garcia-1208513-unsplash.jpg"
            />
            <ImageFormatter
              path="/plan"
              label="Plan"
              imageUrl="/img/reija-huusko.jpg"
            />
          </Grid>
        </div>
      </div >
    );
  }
}

const ImageFormatter = (props) => {
  return (
    <Col md={4}>
      <div className="image-container">
      <LinkContainer to={props.path}>
        <Image rounded className="mx-auto d-block" src={props.imageUrl} />
      </LinkContainer>
      <LinkContainer to={props.path}>
        <div className="centered">{props.label}</div>
      </LinkContainer>
      </div>
    </Col>

  );
}


export default Home;