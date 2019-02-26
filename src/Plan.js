import React, { Component } from 'react';
import './Plan.css';
import calculateDemand from './calculateDemand';
import firebase from "./firebase.js";

import { Table, ButtonToolbar, Modal, Button, Tooltip, OverlayTrigger, Panel, Grid, Form, FormGroup, FormControl, Col, InputGroup, ControlLabel } from 'react-bootstrap'
import Header from './Header.js';

const uuidv4 = require('uuid/v4');

class Plan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Design
      finished_lenght_m: 0,
      headings_hems_lenght_m: 0,
      lenght_shrinkage_p: 0,
      fringe_lenght_m: 0,
      finished_width_cm: 0,
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
      warp_yarn_tex: 0,
      weft_yarn_tex: 0,
      picks_per_cm: 0,
      ends_per_cm: 0,

      id: null,
      title: "",
      showLoad: false,
      list: [],
    }
  }

  componentDidMount() {
  }

  get_target_value = (e) => {
    if (e.target.name === "warp_yarn_tex" ||
      e.target.name === "weft_yarn_tex" ||
      e.target.name === "title") {
      return (e.target.value);
    } else {
      return (parseFloat(e.target.value));
    }
  }

  save = (props, state) => {
    const db = firebase.firestore();
    if (state.id) {
      db.collection("users").doc(props.uid).collection("plans").doc(state.id).set(state);
    } else {
      const id = uuidv4();
      const newState = Object.assign(state, {
        id: id,
      });
      db.collection("users").doc(props.uid).collection("plans").doc(id).set(newState);
      this.setState({ id: id });
    }
  }

  list = (uid) => {
    const db = firebase.firestore();
    const plansRef = db.collection("users").doc(uid).collection("plans")
    plansRef.get().then((querySnapshot) => {
      var list = [];
      querySnapshot.forEach(function (doc) {
        list.push({
          id: doc.id,
          title: doc.data().title ? doc.data().title : "No title" ,
        })
      });
      this.setState({ list: list });
    });
  }

  handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.save(this.props, this.state);
  }

  handleChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ [e.target.name]: this.get_target_value(e) });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  handleCloseLoad = () => {
    this.setState({ showLoad: false });
  }

  handleLoad = () => {
    console.log("Load")
    if (this.props.isSignedIn === true) {
      this.setState({ showLoad: true });
    }
    this.list(this.props.uid);
  }

  render() {
    const callback = (e) => this.handleChange(e);
    const submit = (e) => this.handleSubmit(e);
    return (
      <div className="Plan">
        <Header header="Planner" />
        <Form onSubmit={submit}>
          <div className="Content">
            <Title
              name="title"
              label="Title"
              tooltip="Title of your desing"
              placeholder={this.state.title}
              callback={callback}
              />
          </div>
          <Grid fluid>
            <Col sm={4}>
              <DesingInput
                dimensions={this.state}
                callback={callback}
              />
            </Col>
            <Col sm={4}>
              <WeawingInput
                dimensions={this.state}
                callback={callback}
              />
            </Col>
            <Col sm={4}>
              <YarnInput
                dimensions={this.state}
                callback={callback}
              />
            </Col>
          </Grid>
        </Form>
        <div className="Content">
          <Result
            dimensions={this.state}
          />
        </div>
        <div className="Content">
          <ButtonToolbar>

            <Button
              onClick={this.props.isSignedIn ? this.handleSave : null}
              disabled={!this.props.isSignedIn}
              bsStyle="success"
            >
              {this.props.isSignedIn ? "Save" : "Please sign in"}
            </Button>
            <Button
              onClick={this.handleLoad}
              disabled={!this.props.isSignedIn}
              bsStyle="primary"
            >
              {this.props.isSignedIn ? "Open" : "Please sign in"}
            </Button>
          </ButtonToolbar>
        </div>
        <LoadModal
          showLoad={this.state.showLoad}
          handleClose={this.handleCloseLoad}
          list={this.state.list}
        />

      </div>
    );
  }
}

const LoadModal = (props) => {
  return (
    <div>
      <Modal show={props.showLoad} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Open an existing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table>
            <tbody>
              <tr>
                <th>ID</th>
                <th>Title</th>
              </tr>
              {props.list.map(row =>
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.title}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.callbakc}>Open</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const Title = (props) => {
  return (
    <FormGroup controlId={props.name}>
      <ControlLabel>{props.label}</ControlLabel>
      <OverlayTrigger placement="top" overlay={<Tooltip id={props.name + "tooltip"}>{props.tooltip}</Tooltip>}>
        <FormControl
          bsSize="large"
          name={props.name}
          placeholder={String(props.placeholder)}
          onChange={props.callback}
        />
      </OverlayTrigger>
    </FormGroup>
  );
}


const InputFormatter = (props) => {
  return (
    <FormGroup controlId={props.name}>
      <ControlLabel>{props.label}</ControlLabel>
      <OverlayTrigger placement="top" overlay={<Tooltip id={props.name + "tooltip"}>{props.tooltip}</Tooltip>}>
        <InputGroup>
          <FormControl
            bsSize="small"
            name={props.name}
            placeholder={String(props.placeholder)}
            type={props.type ? props.type : "number"}
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
            Demand
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          Warp lenght {r.warp_lenght_m}m, warp demand {r.warp_demand_g}g, {r.number_of_ends} ends <br></br>
          Weft width {r.warp_width_cm}cm, weft demand {r.weft_demand_g}g, {r.number_of_pics} pics
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
        tooltip="Number of designs to be woven"
        placeholder={d.number_of_designs}
        unit="n"
        callback={callback}
      />
      <InputFormatter
        name="finished_lenght_m"
        label="Finished lenght"
        tooltip="Lenght of finished fabric for one design"
        placeholder={d.finished_lenght_m}
        unit="m"
        callback={callback}
      />
      <InputFormatter
        name="headings_hems_lenght_m"
        label="Headings and hems lenght"
        tooltip="Lenght of headings and hems for one design"
        placeholder={d.headings_hems_lenght_m}
        unit="m"
        callback={callback}
      />
      <InputFormatter
        name="lenght_shrinkage_p"
        label="Lenght shrinkage"
        tooltip="Expected shrinkage in lenght of the woven fabric for one design"
        placeholder={d.lenght_shrinkage_p}
        unit="%"
        callback={callback}
      />
      <InputFormatter
        name="fringe_lenght_m"
        label="Fringe lenght"
        tooltip="Lenght of fringes for one design"
        placeholder={d.fringe_lenght_m}
        unit="m"
        callback={callback}
      />
      <InputFormatter
        name="finished_width_cm"
        label="Finished width"
        tooltip="Width of finished fabric for one design"
        placeholder={d.finished_width_cm}
        unit="cm"
        callback={callback}
      />
      <InputFormatter
        name="width_shrinkage_p"
        label="Width shrinkage"
        tooltip="Expected shrinkage in width of the woven fabric for one design"
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
        tooltip="Number of samples to be woven"
        placeholder={d.number_of_test_pieces}
        unit="n"
        callback={callback}
      />
      <InputFormatter
        name="test_piece_lenght_m"
        label="Test piece lenght"
        tooltip="Lenght reserved for weaving a sample"
        placeholder={d.test_piece_lenght_m}
        unit="m"
        callback={callback}
      />
      <InputFormatter
        name="loom_waste_lenght_m"
        label="Loom waste lenght"
        tooltip="Lenght needed for tying the warp on the loom, and lenght needed at the end. Add about 0.7m for table loom or 0.9m for a floor loom. Minimum warp length reserved for tying the warp is 0.15m and at the end 0.35m when amount of shafts is 2-4. For every additional shaft 0.05m must be added."
        placeholder={d.loom_waste_lenght_m}
        unit="m"
        callback={callback}
      />
      <InputFormatter
        name="cutting_margin_m"
        label="Cutting margin"
        tooltip="Lenght between the designs or samples reserved for cutting them separate"
        placeholder={d.cutting_margin_m}
        unit="m"
        callback={callback}
      />
      <InputFormatter
        name="lenght_take_up_p"
        label="Lenght take up"
        tooltip="Expected take-up due to interlacement"
        placeholder={d.lenght_take_up_p}
        unit="%"
        callback={callback}
      />
      <InputFormatter
        name="width_draw_in_p"
        label="Width draw-in "
        tooltip="Expected width draw-in due to interlacement"
        placeholder={d.width_draw_in_p}
        unit="%"
        callback={callback}
      />
      <InputFormatter
        name="selvedge_warps"
        label="Selvedge warps"
        tooltip="Total number of additional warp ends for the selvedges"
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
        tooltip="Yarn used for warp"
        placeholder={d.warp_yarn_tex}
        type="string"
        unit="TEX"
        callback={callback}
      />
      <InputFormatter
        name="ends_per_cm"
        label="Warp thickness"
        tooltip="Number of warp yarns per cm"
        placeholder={d.ends_per_cm}
        unit="ends / cm"
        callback={callback}
      />
      <InputFormatter
        name="weft_yarn_tex"
        label="Weft weight"
        type="string"
        tooltip="Yarn used for weft"
        placeholder={d.weft_yarn_tex}
        unit="TEX"
        callback={callback}
      />
      <InputFormatter
        name="picks_per_cm"
        label="Weft thickness"
        tooltip="Number of weft yarn layers per cm"
        placeholder={d.picks_per_cm}
        unit="pics / cm"
        callback={callback}
      />
    </div >
  );
}

export default Plan;