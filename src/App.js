import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {type: 'tex',
                  input: '',
                  tex: '',
                  dtex: '',
                  den: '',
                  nel: '',
                  ne: '',
                  nek: '',
                  nm: '',
                };
  }

  handleValueUpdate = (e) => {
    const v = this.toTex(this.state.type, parseFloat(e.target.value), 1.0);
    this.setState({
      input: e.target.value,
    });
    this.updateState(v);
  }

  handleTypeUpdate = (e) => {
    const v = this.toTex(e.target.value, this.state.input);
    this.setState({
      type: e.target.value,
    });
    this.updateState(v);
  }

  toTex(type, v, n) {
    switch(type) {
      case 'tex': return this.texToTex(v, n);
      case 'dtex': return this.dtexToTex(v, n);
      case 'den': return this.denToTex(v, n);
      case 'nel': return this.nelToTex(v, n);
      case 'ne': return this.neToTex(v, n);
      case 'nek': return this.nekToTex(v, n);
      case 'nm': return this.nmToTex(v, n);
      default: return '';
    }
  }

  updateState(v) {
    this.setState({
      tex: this.cleanNumber(this.texToTex(v)),
      dtex: this.cleanNumber(this.texToDtex(v)),
      den: this.cleanNumber(this.texToDen(v)),
      nel: this.cleanNumber(this.texToNel(v)),
      ne: this.cleanNumber(this.texToNe(v)),
      nek: this.cleanNumber(this.texToNek(v)),
      nm: this.cleanNumber(this.texToNm(v)),
    });
  }

  cleanNumber(v) {
    if (Number.isNaN(v) || v === 0 )
      return '';
    const rounded = Math.round( v * 100) / 100;
    return rounded.toString();
  }

  texToTex(v, n = 1.0) { return (v * n); }
  dtexToTex(v, n = 1.0) { return (v * n) / 10.0; }
  denToTex(v, n = 1.0) { return (v * n) / 9.0; }
  nelToTex(v, n = 1.0) { return 1653.515493 / (v / n); }
  neToTex(v, n = 1.0) { return 590.5412474 / (v / n); }
  nekToTex(v, n = 1.0) { return 885.8118712 / (v / n); }
  nmToTex(v, n = 1.0) { return 1000.0 / (v / n); }

  texToDtex(v) { return v * 10.0; }
  texToDen(v) { return v * 9.0; }
  texToNel(v) { return v / 1653.515493; }
  texToNe(v) { return v / 590.5412474; }
  texToNek(v) { return v / 885.8118712; }
  texToNm(v) { return v / 1000.0}

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
            <option value="tex">tex</option>
            <option value="dtex">dtex</option>
            <option value="den">den</option>
            <option value="nm">Nm</option>
            <option value="ne">Ne</option>
            <option value="nel">NeL</option>
            <option value="nek">NeK</option>
          </select>
        </form>
        <br/>
        <div className="Yarn-results">
          <YarnResultBox 
            label="tex"
            value={this.state.tex}
            help="Mass of yarn in grams per 1.000 meters"
            />
          <YarnResultBox 
            label="dtex"
            value={this.state.dtex}
            help="Mass of yarn in grams per 10.000 meters"
            />
          <YarnResultBox 
            label="den"
            value={this.state.den}
            help="Denier: Mass of yarn in grams per 9.000 meters"
            />
          <YarnResultBox 
            label="Nm"
            value={this.state.nm}
            help="Metric yarn number: Lenght of yarn in meters per mass of 1 gram"
            />
          <YarnResultBox 
            label="Ne"
            value={this.state.ne}
            help="English cotton yarn number (ECC): Number of 840 yard strands per mass of 1 English pound"
            />
          <YarnResultBox 
            label="NeL"
            value={this.state.nel}
            help="English linen yarn number: Number of 300 yard strands per mass of 1 English pound"
            />
          <YarnResultBox       
            label="NeK"
            value={this.state.nek}
            help="English wool yarn number (worsted): Number of 300 yard strands per mass of 1 English pound"
            />
       </div>
       <p className="Bottom-legend">
         <br/>
         English pound aka Imperial Standard Pound equals to 453.59265 grams<br/>
         Yard equals to  0.9144 m
       </p>
      </div>
    );
  }
}

/*
('TEX', 'tex (g/1.000m)'), # Mass of yarn in grams per 1000m
('DTEX', 'dtex (g/10.000m)'), # Mass of yarn in grams per 10000m
('DEN', 'den (Denier, g/9.000m)'), # Mass of yarn in grams for leght of 9000,
('NM', 'Nm (Metric yarn number, m/g)'), # Lengh in meters per 1g of mass
('NE', 'Ne (English cotton yarn number) aka ECC'), # Number of 840 yard strands per 1 Englih pound of mass
('NEL', 'NeL (English linen yarn number)'), # Number of 300 yard strands per 1 Englih pound of mass
('NEK', 'NeK (English wool yarn number, worsted)'), # Number of 300 yard strands per 1 Englih pound of mass
*/

function YarnResultBox(props) {
  return (
    <div classname="Yarn-result-box">
      <div className="Type-help">{props.help}</div>
      <div className="Type-label">{props.label} {props.value}</div><br/>
    </div>
)
}

export default App;
