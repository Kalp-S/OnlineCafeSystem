import React, { Component } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Header from '../header/headerComponent';
import data from '../../data/users'

import './viewOrders.css';
const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 1000,
});

class ViewOrders extends Component {
  constructor(props) {
    super(props);
    const info = this.props.location.state ? this.props.location.state.info : {};
    const date = [];
    this.state = {
      info: info,
      menu: {},
      cart: [],
      err: 0,
      date:{},
      month:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    };
    this.getCart()
  }

  async getCart() {
    let res = null;
    this.setState({
      menu: [],
      cart: [],
    })
    const data = await instance.post('/menu/view', {
    }).catch((e) => {
      res = e.response;
    });
    if (res == null) {
      data.data.forEach((item) => {
        if (item.isAvailable === "true") {
          console.log(item.id)
          this.state.menu[item.id] = item;
        }
      });
      const { email } = this.state.info;
      const cartItem = await instance.post('/cart/user/view', {
        email
      }).catch((e) => {
        res = e.response;
      });
      if (res == null) {
        cartItem.data.forEach((item) => {
          console.log(this.state.menu[item.menuId])
          console.log(item)
          item.menu = this.state.menu[item.menuId]
          let cart = this.state.cart;
          cart.push(item);
          this.setState({
            cart: cart
          })
        });
      }
    }
    console.log(JSON.stringify(this.state.cart));
  }

  async deleteFromCart(item) {
    let res = null;
    const { email } = this.state.info;
    const { id } = item;
    if(parseInt(`${item.day}`)-1 > new Date().getDate()){
      const data = await instance.post('/cart/remove', {
        id,
        email
      }).catch((e) => {
        res = e.response;
      });
      if (res == null) {
        this.setState({
          err: 1,
        });
      }
      this.getCart();
    }
  }

  render() {
    return (
      <div className="User">
        <Header info={this.state.info} />
        <div className="container">
          <table id="cart" className="table table-hover table-condensed">
            <thead>
              <tr>
                <th style={{ width: '10%' }}>Lunch Option</th>
                <th style={{ width: '30%' }}>Description</th>
                <th style={{ width: '10%' }}>Price</th>
                <th style={{ width: '10%' }}>Date</th>
                <th style={{ width: '10%' }}>Options</th>
              </tr>
            </thead>
            {console.log(this.state.cart)}
            {this.state.cart.map((item) => (
              <tbody>
                <tr>
                  <td data-th="Product">
                    <div className="row">
                      <div className="col-sm-2 hidden-xs">
                        <img
                          src={data[Math.floor(Math.random() * Math.floor(6)) +1]}
                          alt="..."
                          className="img-responsive"
                          style={{
                            width: '200px',
                            height: '200px',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="col-sm-15" style={{ marginTop: '5%' }}>
                    <h4 className="nomargin">{item.menu.name}</h4>
                    {item.menu.ingredients}
                    </div>
                  </td>
                  <td data-th="Price">{`$${item.menu.price}`}</td>
                  <td>
                    <div className="font-italic sticky-top">
                      <h4>{`${item.month} ${item.day}`}</h4>
                    </div>
                  </td>
                  <td className="actions" data-th="">
                    <button className="btn btn-danger btn-sm"onClick={() => {
                      this.deleteFromCart(item);
                  }}><i className="fa fa-trash-o" /></button>
                  </td>
                </tr>
              </tbody>
            ))}
            <tfoot>
              <tr>
                <td>
                  <a href="#" className="btn btn-warning">
                    <i className="fa fa-angle-left" />
                    {' '}
                    Continue Shopping
                  </a>
                </td>
                <td colSpan="2" className="hidden-xs" />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
}

export default ViewOrders;
