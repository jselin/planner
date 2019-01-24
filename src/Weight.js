import React, { Component } from 'react';
import './Weight.css';
import { Table, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { UNIT_TYPE, units, unitsFormatter, fromUnitToBase } from './units.js';
import { numberingToFloat } from './yarn-number'


class Weight extends Component {
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
      <div className="Weight">
        <header className="Weight-header">
          <h1 className="Weight-title">Yarn weight calculator</h1>
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
        <UnitLegend/>
        <p className="Bottom-legend">
          Copyright <a href="mailto:yarnweightcalculator@selinf.fi">Jari Selin</a>
       </p>
      </div>
    );
  }
}

function UnitLegend(props) {
  return (
    <div className="UnitLegend">
      <pre>
        Pound: 453.59265 grams{"\n"}
        Ounce: 1/16 pound{"\n"}
        Dram:  ​1⁄16 ounce{"\n"}
        Grain: 64.79891 milligrams{"\n"}
        {"\n"}
        Yard: 0.9144 meters{"\n"}
        Inch: 1/36 yard{"\n"}
        Skein: 256 yards{"\n"}
        Thread: 54 inches{"\n"}
        Lea: 120 yards or 80 threads{"\n"}
        Hank: 7 leas or 840 yards{"\n"}
        Spindle: 18 hanks or 15.120 yards{"\n"}
        {"\n"}
        Cut: 120 threads or 300 yards{"\n"}
        Slip: 12 cuts or 3600 yards{"\n"}
        Spyndle: 4 slips or 14,400 yards{"\n"}
      </pre>
    </div>
  );
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
          <th>Unit</th>
          <th>Type</th>
        </tr>
        {yarns.map(unit =>
          <tr key={unit.type}>
            <td>{unit.label}</td>
            <td>{unit.value}</td>
            <td>{unit.unit}</td>
            <td>{unit.system}</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

export default Weight;
