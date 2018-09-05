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
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({tex: event.target.value});
  }

  handleSubmit(event) {
    alert('A new name was submitted: ' + this.state.value)
    event.preventDefault();
  }

  // 'DTEX', 'dtex (g/10.000m)'), # Mass of yarn in grams per 10000m
  dtex() {
    return this.state.tex/10;
  }

  den(){
    return this.state.tex/9;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Just start typing to fileds below
        </p>
        <form onSubmit={this.handleSubmit}>
          <label>
            TEX:
            <input type="text" value={this.state.tex} onChange={this.handleChange} />
          </label>
        </form>
        <p className="App-results">
          tex: {this.dtex()} <br/>
          den: {this.den()}
        </p>
      </div>
    );
  }
}

export default App;
