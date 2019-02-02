import React, { Component } from 'react';
import './Demand.css';
import { Table, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import Header from './Header.js';


/*
Length shrinkage (m) = (Length + Headings/Hems) / 100 x Length shrinkage (%)										
Width shrinkage (cm) = Width / 100 x Width shrinkage (%)										
Length take-up (m) =  ((Length + Headings/Hems + Length shringage (m) + Fringes) x Number of designs + Test Peace x Number of test pieces + Loom waste + Cutting Margin) / 100 x Length take up (%)										
Width draw-in (cm) = (Width + Width shrinkage (cm)) / 100 * Width draw-in (%)										
Fabric lenght (m) = (Lenght + Headings/Hems + Lenght shrinkage (m)) x Number of designs + Length of Test Piece x Number of test pieces + Length take-up (m)										
										
Warp length (m) = (Length + Headings/Hems + Length shringage (m) + Fringes) x Number of designs + Length of Test Piece x Number of test pieces + Loom waste + Cutting Margin + Length take-up (m)										
Warp width (m) = Width + Width shrinkage (cm) + Width draw-in (cm)										
Number of ends = Warp width (cm) x Ends per cm										
Number of picks = Warp length (m) x 100 x Picks per cm										
										
Warp demand (g) = Ends per cm x Warp width (cm) x Warp lenght (m) x Yarn TEX number / 1000 										
Weft demand (g) = Picks per cm tiheys x Warp width (cm) x Fabric length (m) x Yarn TEX number /1000										
*/


class Demand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finished_lenght_m: 1.0,
      headings_hems_lenght_m: 0.1,
      total_lenght_m: 0,
    }
  }

  handleValueUpdate = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      finished_lenght_m: e.target.value,
      total_lenght_m: this.calculate(),
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
  }

  calculate() {
    return (
      this.state.finished_lenght_m + this.state.headings_hems_lenght_m
    );
  }

  render() {
    return (
      <div className="Demand">
        <Header header="Demand planner" />
        <Form className="Input-Form" inline onSubmit={(e) => this.handleSubmit(e)}>
          <FormGroup>
            <ControlLabel>Yarn number</ControlLabel>{' '}
            <FormControl
              id="formControlsText"
              onChange={(e) => this.handleValueUpdate(e)} />{' '}
          </FormGroup>
        </Form>

        <Table className="Results-Table" bordered hover>
          <tbody>
            <tr key="total_lenght_m">
              <td>Total lenght</td>
              <td>{this.state.total_lenght_m}</td>
              <td>m</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

/*
<Table className="Input-Table" bordered hover>
      <tbody>
        <tr key="finished_lenght_m">
          <td>Finished lenght</td>
          <td>{this.state.finished_lenght_m}</td>
          <td>m</td>
        </tr>
        <tr key="headings_hems_lenght_m">
          <td>Headings and hems lenght</td>
          <td>{this.state.headings_hems_lenght_m}</td>
          <td>m</td>
        </tr>
      </tbody>
    </Table>

    */


export default Demand;