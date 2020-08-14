import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Header from '../header/headerCatererComponent';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router';

import './CatererViewOrders.css';
const axios = require('axios');
const data = require('../../data/users');
const instance = axios.create({
  baseURL: 'http://localhost:3001/orders',
  timeout: 1000,
});
class CatererViewOrders extends Component {
  constructor(props) {
    super(props);
    const info = this.props.location.state ? this.props.location.state.info : {};
    this.state = {
      employees: [],
      info: info,
      orders: [],
    };
    this.viewMenu()
  }
  async viewMenu() {
    let res = null;
    const data = await instance.post('/view', {
    }).catch((e) => {
      res = e.response;
      console.log(res)
    });
    if (res == null) {
      this.setState({
        orders:data.data,
      });
    }
  }
  render() {
    return (
      <div>
      <Header info={this.state.info}/ >
      <table class="table">
    <thead>
      <tr>
        <th scope="col" style = {{width:'5%'}}>#</th>
        <th scope="col" style = {{width:'20%'}}>User Email</th>
        <th scope="col" style = {{width:'15%'}}>Company</th>
        <th scope="col" style = {{width:'15%'}}>Date</th>
        <th scope="col" style ={{width:'40%'}}>Order Details</th>
      </tr>
    </thead>
    <tbody>
      {this.state.orders.map((item, i) =>
        <tr key={i}>
        {console.log(item)}

          <th scope="row">{i}</th>
          <td>{item.email}</td>
          <td>{item.companyName}</td>
          <td>{item.month + item.day}</td>
          <td>{item.modifications}</td>
        </tr>
      )}

    </tbody>
  </table>
</div>
    );
  }
}

export default withRouter(CatererViewOrders);
