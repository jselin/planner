import React, { Component } from 'react';
import './App.css';
import { Table, Form } from 'react-bootstrap';
import { UNIT_TYPE, units, unitsFormatter, toTex } from './units.js';
import {numberingToFloat} from './yarn-number'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      inputUnitType: UNIT_TYPE.TEX,
      tex: 0.0
    }
  }

  handleValueUpdate = (e) => {
    const tex = toTex(this.state.inputUnitType, numberingToFloat(e.target.value), 1.0);
    e.preventDefault(); 
    e.stopPropagation();
    this.setState({
      input: e.target.value,
      tex: tex,
    });
  }
  
  handleTypeUpdate = (e) => {
    const tex = toTex(e.target.value, numberingToFloat(this.state.input), 1.0);
    this.setState({
      inputUnitType: e.target.value,
      tex: tex,
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
        <p className="App-intro">
          Just start typing to field below
        </p>
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <label>
            <input name="value" type="text" onChange={(e) => this.handleValueUpdate(e)} />
          </label>
          <select name="type" defaultValue="tex" onChange={(e) => this.handleTypeUpdate(e)} >
            <UnitOptions /> 
          </select>
          {units.find(unit =>
            unit.type === this.state.inputUnitType
          ).unit}
        </Form>
        <br />
        <div className="Table-container">
          <Yarns tex={this.state.tex} />
        </div>
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
  const yarns = unitsFormatter(props.tex);

  return (
    <Table className="Result-Table" striped bordered hover>
      <tbody>
        <tr>
          <th>Measure</th>
          <th>Value</th>
          <th>Unit</th>
        </tr>
        {yarns.map(unit => 
          <tr key={unit.type}>
            <td>{unit.label}</td>
            <td>{unit.value}</td>
            <td>{unit.unit}</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default App;
