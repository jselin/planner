import React, { Component } from 'react';
import './header.css';


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"> {this.props.header}</h1>
        </header>
      </div>

    );
  }
}

export default Header;