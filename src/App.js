import React, { Component } from 'react';
import './App.css';
import { Table, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { UNIT_TYPE, units, unitsFormatter, fromUnitToBase } from './units.js';
import { numberingToFloat } from './yarn-number'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      inputUnitType: UNIT_TYPE.TEX,
      base: 0.0
    }
  }

  handleValueUpdate = (e) => {
    const base = fromUnitToBase(this.state.inputUnitType, numberingToFloat(e.target.value), 1.0);
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      input: e.target.value,
      base: base,
    });
  }

  handleTypeUpdate = (e) => {
    const base = fromUnitToBase(e.target.value, numberingToFloat(this.state.input), 1.0);
    this.setState({
      inputUnitType: e.target.value,
      base: base,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Yarn weight calculator</h1>
        </header>
        <Form className="Input-Form" inline onSubmit={(e) => this.handleSubmit(e)}>
          <FormGroup>
            <ControlLabel>Yarn number</ControlLabel>{' '}
            <FormControl
              id="formControlsText"
              onChange={(e) => this.handleValueUpdate(e)} />{' '}
            <FormControl
              componentClass="select"
              id="unit-select"
              placeholder="Tex"
              onChange={(e) => this.handleTypeUpdate(e)}>
              <UnitOptions />
            </FormControl>{' '}
            {units.find(unit =>
              unit.type === this.state.inputUnitType
            ).unit}
          </FormGroup>
        </Form>
        <br />
        <div className="Table-container">
          <Yarns base={this.state.base} />
        </div>
        <p className="UnitLegend">
          <pre>
            Skein: 256 Yards{"\n"}
            Yard: 0.9144 Meters{"\n"}
            Pound: 453.59265 Grams{"\n"}
            Dram: 1.7718451953125 Grams{"\n"}
          </pre>
        </p>
        <p className="Bottom-legend">
          Copyright Jari Selin
       </p>
      </div>
    );
  }
}

function UnitOptions(props) {
  return (units.map(unit =>
    <option key={unit.type} value={unit.type}>{unit.label}</option>)
  );
}

function Yarns(props) {
  const yarns = unitsFormatter(props.base);

  return (
    <Table className="Result-Table" striped bordered hover>
      <tbody>
        <tr>
          <th>Numbering system</th>
          <th>Value</th>
          <th>Type</th>
          <th>Unit</th>
        </tr>
        {yarns.map(unit =>
          <tr key={unit.type}>
            <td>{unit.label}</td>
            <td>{unit.value}</td>
            <td>{unit.system}</td>
            <td>{unit.unit}</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default App;
