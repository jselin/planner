import React, { Component } from 'react';
import './Demand.css';
import calculateDemand from './calculateDemand';

import { Grid, Table, Form, FormGroup, FormControl, Col, InputGroup, ControlLabel } from 'react-bootstrap'
//import Table from 'react-bootstrap/Table';
//import Form from 'react-bootstrap/Form';
//import InputGroup from 'react-bootstrap/InputGroup';
//import Col from 'react-bootstrap/Col';
//import Container from 'react-bootstrap/Container';
import Header from './Header.js';


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
  }

  handleChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ [e.target.name]: parseFloat(e.target.value) });
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
        <div className="Content">
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
            <Result
              dimensions={this.state}
            />
          </Form>
        </div>
      </div>
    );
  }
}

const InputFormatter = (props) => {
  return (
    <FormGroup controlId={props.name}>
      <ControlLabel>{props.label}</ControlLabel>
      <InputGroup>
        <FormControl
          bsSize="small"
          name={props.name}
          placeholder={String(props.placeholder)}
          type="number"
          onChange={props.callback} />
        <InputGroup.Addon>{props.unit}</InputGroup.Addon>
      </InputGroup>
    </FormGroup>
  );
}

const ResultFormatter = (props) => {
  return (
    <tr key={props.key}>
      <td>{props.label}</td>
      <td>{props.value}</td>
      <td>{props.unit}</td>
    </tr>
  );
}

const Result = (props) => {
  const r = calculateDemand(props.dimensions);
  return (
    <div>
      <h2>Calculated demand</h2>
      <Table className="Results-Table" bordered hover >
        <tbody>
          <ResultFormatter
            key="warp_lenght_m"
            label="Warp lenght"
            value={r.warp_lenght_m}
            unit={"m"}
          />
          <ResultFormatter
            key="warp_width_cm"
            label="Warp width"
            value={r.warp_width_cm}
            unit={"cm"}
          />
          <ResultFormatter
            key="number_of_ends"
            label="Number of ends"
            value={r.number_of_ends}
            unit={"ends"}
          />
          <ResultFormatter
            key="number_of_pics"
            label="Number of pics"
            value={r.number_of_pics}
            unit={"pics"}
          />
          <ResultFormatter
            key="warp_demand_g"
            label="Warp demand"
            value={r.warp_demand_g}
            unit={"g"}
          />
          <ResultFormatter
            key="weft_demand_g"
            label="Weft demand"
            value={r.weft_demand_g}
            unit={"g"}
          />
        </tbody>
      </Table >
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
      <InputFormatter
        name="number_of_designs"
        label="Number of designs"
        placeholder={d.number_of_designs}
        unit="n"
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
        name="test_piece_lenght_m"
        label="Test piece lenght"
        placeholder={d.test_piece_lenght_m}
        unit="m"
        callback={callback}
      />
      <InputFormatter
        name="number_of_test_pieces"
        label="Number of test pieces"
        placeholder={d.number_of_test_pieces}
        unit="n"
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
        unit="pics/cm"
        callback={callback}
      />
    </div >
  );
}

export default Demand;