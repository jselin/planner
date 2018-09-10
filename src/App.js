import React, { Component } from 'react';
import './App.css';

/*
('TEX', 'tex (g/1.000m)'), # Mass of yarn in grams per 1000m
('DTEX', 'dtex (g/10.000m)'), # Mass of yarn in grams per 10000m
('DEN', 'den (Denier, g/9.000m)'), # Mass of yarn in grams for leght of 9000,
('NM', 'Nm (Metric yarn number, m/g)'), # Lengh in meters per 1g of mass
('NE', 'Ne (English cotton yarn number) aka ECC'), # Number of 840 yard strands per 1 Englih pound of mass
('NEL', 'NeL (English linen yarn number)'), # Number of 300 yard strands per 1 Englih pound of mass
('NEK', 'NeK (English wool yarn number, worsted)'), # Number of 300 yard strands per 1 Englih pound of mass
*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {tex: '',
                  dtex: '',
                  den: ''};

    //this.texUpdated = this.texUpdated.bind(this);
  }

  texUpdated = (event) => {
    var v = this.texToTex(event.target.value, 1.0);

    this.setState({
      tex: event.target.value,
      dtex: this.texToDtex(v),
      den: this.texToDen(v),
    });
  }

  dtexUpdated = (event) => {
    var v = this.dtexToTex(event.target.value, 1.0);

    this.setState({
      tex: this.texToTex(v),
      dtex: event.target.value,
      den: this.texToDen(v),
    });
  }

  denUpdated = (event) => {
    var v = this.denToTex(event.target.value, 1.0);

    this.setState({
      tex: this.texToTex(v),
      dtex: this.texToDtex(v),
      den: event.target.value,
    });
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
          <h1 className="App-title">Welcome to Yarn weight calculator</h1>
        </header>
        <p className="App-intro">
          Just start typing to fields below
        </p>
        <form onSubmit={this.handleSubmit}>
          <label>tex: <input type="text" value={this.state.tex} onChange={this.texUpdated} /><br/></label>
          <label>dtex: <input type="text" value={this.state.dtex} onChange={this.dtexUpdated} /><br/></label>
          <label>den: <input type="text" value={this.state.den} onChange={this.denUpdated} /><br/></label>
        </form>
      </div>
    );
  }
}

export default App;
