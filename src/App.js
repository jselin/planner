import React, { Component } from 'react';
import './App.css';
import { Table } from 'react-bootstrap';

//const yard = 0.9144 //m
//const pound = 453.59265 //g

const units = {
  tex: {
    label: "Tex",
    unit: "grams / 1,000 meters"
  },
  den: {
    label: "Denier",
    unit: "grams / 10,000 meters"
  },
  dtex: {
    label: "Decitex",
    unit: "grams / 9,000 meters"
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      input_unit: units.tex.label,
      tex: 0.0
    }
  }

  handleValueUpdate = (e) => {
    const v = this.toTex(this.state.input_unit, parseFloat(e.target.value), 1.0);
    this.setState({
      input: e.target.value,
      tex: v
    })
  }

  handleTypeUpdate = (e) => {
    const v = this.toTex(e.target.value, this.state.input);
    this.setState({
      input_unit: e.target.value,
      tex: v
    })
  }

  toTex(unit, v) {
    switch (unit) {
      case units.tex.label: return v;
      case units.dtex.label: return v / 10.0;
      case units.den.label: return v / 9.0;
      default: return 0;
    }
  }


  fromNel(v) { return 1653.515493 / v; }
  fromNe(v) { return 590.5412474 / v; }
  fromNek(v) { return 885.8118712 / v; }
  fromNm(v) { return 1000.0 / v; }

  toNel(v) { return v / 1653.515493; }
  toNe(v) { return v / 590.5412474; }
  toNek(v) { return v / 885.8118712; }
  toNm(v) { return v / 1000.0 }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Yarn weight calculator</h1>
        </header>
        <p className="App-intro">
          Just start typing to field below
        </p>
        <form>
          <label>
            <input name="value" type="text" onChange={(e) => this.handleValueUpdate(e)} />
          </label>
          <select name="type" defaultValue="tex" onChange={(e) => this.handleTypeUpdate(e)} >
            <Units/>
          </select>
        </form>
        <br />
        <Table>
          <tbody>
            <tr>
              <th>Label</th>
              <th>Value</th>
              <th>Unit</th>
            </tr>
            <Yarns tex={this.state.tex}/>
          </tbody>
        </Table>
        <p className="Bottom-legend">
          <br />
          English pound aka Imperial Standard Pound equals to 453.59265 grams<br />
          Yard equals to  0.9144 m
       </p>
      </div>
    );
  }
}

function Units(props) {
  var res = [];

  Object.keys(units).forEach((key) => 
    res.push(
      <option key={key} value={units[key].label}>{units[key].label}</option>
    ));
  
  return res;
}

function Yarns(props) {
  var yarns = [];
  Object.keys(units).forEach((key) => 
    yarns.push(
      <Yarn key={key} unit={units[key].label} tex={props.tex}/>
    ));

  return yarns;
}

function Yarn(props) {
  const yarn = toYarn(props.unit, props.tex);

  return (
    <tr key={props.unit}>
      <td>{yarn.label}</td>
      <td>{yarn.value}</td>
      <td>{yarn.unit}</td>
    </tr>
  )
}

function toYarn(unit, v) {
  switch (unit) {
    case units.tex.label:
      return {
        value: cleanNumber(v),
        label: units.tex.label,
        unit: units.tex.unit
      };
    case units.dtex.label:
      return {
        value: cleanNumber(v * 10.0),
        label: units.dtex.label,
        unit: units.dtex.unit
      };
    case units.den.label:
      return {
        value: cleanNumber(v * 9.0),
        label: units.den.label,
        unit: units.den.unit
      };
    default:
      return {
        value: '',
        label: '',
        unit: ''
      };
  }
}

function cleanNumber(v) {
  //console.log(v);
  if (Number.isNaN(v) || v === 0)
    return '';
  const rounded = Math.round(v * 100) / 100;
  return rounded.toString();
}

export default App;
