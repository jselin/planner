import React, { Component } from 'react';
import './Header.css';


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="Header">
        <header className="Header-header">
          <h1 className="Header-title"> {this.props.header}</h1>
        </header>
      </div>

    );
  }
}

export default Header;