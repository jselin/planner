import React, { Component } from 'react';
import './Demand.css';
import calculateDemand from './calculateDemand';
import firebase from "./firebase.js";

import { Tooltip, OverlayTrigger, Panel, Grid, Form, FormGroup, FormControl, Col, InputGroup, ControlLabel } from 'react-bootstrap'
import Header from './Header.js';

const uuidv4 = require('uuid/v4');
const localStorage = window.localStorage;

class Demand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Design
      finished_lenght_m: 1,
      headings_hems_lenght_m: 0,
      lenght_shrinkage_p: 0,
      fringe_lenght_m: 0,
      finished_width_cm: 100,
      width_shrinkage_p: 0,
      number_of_designs: 1,

      // Weaving
      test_piece_lenght_m: 0,
      number_of_test_pieces: 0,
      loom_waste_lenght_m: 0,
      cutting_margin_m: 0,
      lenght_take_up_p: 0,
      width_draw_in_p: 0,
      selvedge_warps: 0,

      // Yarns
      warp_yarn_tex: 24,
      weft_yarn_tex: 24,
      picks_per_cm: 20,
      ends_per_cm: 20,
    }
    this.getInitialState();
  }

  getUUID() {
    var uuid = localStorage.getItem('Texdesigners-uuid');
    if (uuid === null) {
      uuid = uuidv4();
      localStorage.setItem('Texdesigners-uuid', uuid);
    }
    return uuid;
  }

  getInitialState = () => {
    const uuid = this.getUUID();
    const db = firebase.firestore();
    const docRef = db.collection("plans").doc(uuid);
    docRef.get().then( (doc) => {
      if (doc.exists) {
        this.setState(doc.data());
      }
    });
  }

  post = (state, e) => {
    const uuid = this.getUUID();
    const db = firebase.firestore();
    const newState = Object.assign(state, { [e.target.name]: parseFloat(e.target.value) });
    db.collection("plans").doc(uuid).set(newState);
  }

  handleChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ [e.target.name]: parseFloat(e.target.value) });
    this.post(this.state, e);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    const callback = (e) => this.handleChange(e);
    const submit = (e) => this.handleSubmit(e);
    return (
      <div className="Demand">
        <Header header="Demand planner" />
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <Grid fluid>
            <Col sm={4}>
              <DesingInput
                dimensions={this.state}
                callback={callback}
                submit={submit}
              />
            </Col>
            <Col sm={4}>
              <WeawingInput
                dimensions={this.state}
                callback={callback}
                submit={submit}
              />
            </Col>
            <Col sm={4}>
              <YarnInput
                dimensions={this.state}
                callback={callback}
                submit={submit}
              />
            </Col>
          </Grid>
        </Form>
        <div className="Content">
          <Result
            dimensions={this.state}
          />
        </div>
      </div>
    );
  }
}

const tooltip = (
  <Tooltip id="tooltip">
    Holy moly!
  </Tooltip>
)

const InputFormatter = (props) => {
  return (
    <FormGroup controlId={props.name}>
      <ControlLabel>{props.label}</ControlLabel>
      <OverlayTrigger placement="right" overlay={tooltip}>
        <InputGroup>
          <FormControl
            bsSize="small"
            name={props.name}
            placeholder={String(props.placeholder)}
            type="number"
            onChange={props.callback} />
          <InputGroup.Addon>{props.unit}</InputGroup.Addon>
        </InputGroup>
      </OverlayTrigger>
    </FormGroup>
  );
}

const Result = (props) => {
  const r = calculateDemand(props.dimensions);
  return (
    <div>
      <Panel>
        <Panel.Heading>
          <Panel.Title>
            Result
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          Warp lenght {r.warp_lenght_m}m, warp demand {r.warp_demand_g}g with {r.number_of_ends} ends <br></br>
          Weft width {r.warp_width_cm}cm, weft demand {r.weft_demand_g}g with {r.number_of_pics} pics
      </Panel.Body>
      </Panel>
    </div>
  );
}

const DesingInput = (props) => {
  const d = props.dimensions;
  const callback = props.callback;

  return (
    <div>
      <h2>Design</h2>
      <InputFormatter
        name="number_of_designs"
        label="Number of designs"
        placeholder={d.number_of_designs}
        unit="n"
        callback={callback}
        tooltip="Amazing tooltip"
      />      <InputFormatter
        name="finished_lenght_m"
        label="Finished lenght"
        placeholder={d.finished_lenght_m}
        unit="m"
        callback={callback}
      />
      <InputFormatter
        name="headings_hems_lenght_m"
        label="Headings and hems lenght"
        placeholder={d.headings_hems_lenght_m}
        unit="m"
        callback={callback}
      />
      <InputFormatter
        name="lenght_shrinkage_p"
        label="Lenght shrinkage"
        placeholder={d.lenght_shrinkage_p}
        unit="%"
        callback={callback}
      />
      <InputFormatter
        name="fring_lenght_m"
        label="Fringe lenght"
        placeholder={d.fringe_lenght_m}
        unit="m"
        callback={callback}
      />
      <InputFormatter
        name="finished_width_cm"
        label="Finished width"
        placeholder={d.finished_width_cm}
        unit="cm"
        callback={callback}
      />
      <InputFormatter
        name="width_shrinkage_p"
        label="Width shrinkage"
        placeholder={d.width_shrinkage_p}
        unit="%"
        callback={callback}
      />

    </div>
  );
}

const WeawingInput = (props) => {
  const d = props.dimensions;
  const callback = props.callback;

  return (
    <div>
      <h2>Weaving</h2>
      <InputFormatter
        name="number_of_test_pieces"
        label="Number of test pieces"
        placeholder={d.number_of_test_pieces}
        unit="n"
        callback={callback}
      />
      <InputFormatter
        name="test_piece_lenght_m"
        label="Test piece lenght"
        placeholder={d.test_piece_lenght_m}
        unit="m"
        callback={callback}
      />
      <InputFormatter
        name="loom_waste_lenght_m"
        label="Loom waste lenght"
        placeholder={d.loom_waste_lenght_m}
        unit="m"
        callback={callback}
      />
      <InputFormatter
        name="cutting_margin_m"
        label="Cutting margin"
        placeholder={d.cutting_margin_m}
        unit="m"
        callback={callback}
      />
      <InputFormatter
        name="lenght_take_up_p"
        label="Lenght take up"
        placeholder={d.lenght_take_up_p}
        unit="%"
        callback={callback}
      />
      <InputFormatter
        name="width_draw_in_p"
        label="Width draw-in "
        placeholder={d.width_draw_in_p}
        unit="%"
        callback={callback}
      />
      <InputFormatter
        name="selvedge_warps"
        label="Selvedge warps"
        placeholder={d.selvedge_warps}
        unit="n"
        callback={callback}
      />
    </div >
  );
}

const YarnInput = (props) => {
  const d = props.dimensions;
  const callback = props.callback;

  return (
    <div>
      <h2>Yarns</h2>
      <InputFormatter
        name="warp_yarn_tex"
        label="Warp weight"
        placeholder={d.warp_yarn_tex}
        unit="TEX"
        callback={callback}
      />
      <InputFormatter
        name="ends_per_cm"
        label="Warp thickness"
        placeholder={d.ends_per_cm}
        unit="ends / cm"
        callback={callback}
      />
      <InputFormatter
        name="weft_yarn_tex"
        label="Weft weight"
        placeholder={d.weft_yarn_tex}
        unit="TEX"
        callback={callback}
      />
      <InputFormatter
        name="picks_per_cm"
        label="Weft thickness"
        placeholder={d.picks_per_cm}
        unit="pics / cm"
        callback={callback}
      />
    </div >
  );
}

export default Demand;