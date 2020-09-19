import React, { Component } from 'react';
import data from '../../data/users'
import Header from '../header/headerComponent';
import './placeOrders.css';

const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 1000,
});

class PlaceOrders extends Component {
  constructor(props) {
    super(props);
    const info = this.props.location.state ? this.props.location.state.info : {};
    let day = new Date().getDate();
    const date = [];
    this.state = {
      info,
      menu: [[], [], [], []],
      header: ['Appetizers', 'Entrees', 'Main Menu', 'Desserts'],
      modifications: {},
      err: 0,
      dateOptions:[day, day+1, day+2],
      month:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      date:{},
    };
    this.viewMenu();
  }

  async viewMenu() {
    let res = null;
    const data = await instance.post('/menu/view', {
    }).catch((e) => {
      res = e.response;
    });
    const appetizers = [];
    const entrees = [];
    const mainMenu = [];
    const desserts = [];
    data.data.forEach((item) => {
      if (item.isAvailable === "true") {
        if (item.type === 'Appetizers') {
          appetizers.push(item);
        } else if (item.type === 'Entrees') {
          entrees.push(item);
        } else if (item.type === 'Main Menu') {
          mainMenu.push(item);
        } else if (item.type === 'Desserts') {
          desserts.push(item);
        }
      }
    });
    const menu = [];
    menu.push(appetizers);
    menu.push(entrees);
    menu.push(mainMenu);
    menu.push(desserts);
    if (res == null) {
      this.setState({
        menu,
      });
    }
  }

  async addToCart(menuId, modifications, date) {
    let res = null;
    let d = new Date();
    const { email } = this.state.info;
    const { companyName } = this.state.info;
    const month = this.state.month[new Date().getMonth()];
    const day = date ? date.substring(date.length-1, date.length) : `${d.getDate()}`;
    const data = await instance.post('/cart/add', {
      email,
      menuId,
      modifications,
      month,
      day,
      companyName
    }).catch((e) => {
      res = e.response;
    });
    if (res == null) {
      this.setState({
        err: 1,
      });
    }
  }
  setDate(month, day, index){
    this.state.date[index] = `${this.state.month[month]} ${day}`
    document.getElementById("dropdownMenuLink"+index).textContent = `${this.state.month[new Date().getMonth()]} ${day}`
  }

  render() {
    return (
      <div className="User">
        <Header info={this.state.info}/>
        {this.state.header.map((menu, i) => (
          <div>
            <div className="font-italic  User-today sticky-top">
              <h2>
                {this.state.header[i]}
              </h2>
              <div className="User-line" />
            </div>

            { this.state.menu[i].map((item, index) => (
              <div>
                <div className="card mb-3" style={{ width: '70%', marginTop: '2%', marginLeft: '2%' }}>
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <img src={data[(index + i) %7]} className="card-img" />
                    </div>
                    <div className="col-md-3">
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">{item.ingredients}</p>
                        <p className="card-text">
                          {`$${item.price}      `}
                        </p>
                        <button className="btn btn-primary" onClick={() => { this.addToCart(item.id, this.state.modifications[`${i}+${index}`],this.state.date[`${i}+${index}`]); }}>Add to Cart</button>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          placeholder="Enter Modifications"
                          rows="4"
                          onChange={(event) => {
                            this.state.modifications[`${i}+${index}`] = event.target.value;
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-2">
                    <div class="dropdown">
                      <a class="btn btn-primary  dropdown-toggle" role="button" id={"dropdownMenuLink"+ `${i}+${index}`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.state.date[`${i}+${index}`] ? this.state.date[`${i}+${index}`] : "Choose Date"}
                      </a>
                      <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <button class="dropdown-item" onClick={() => {this.setDate(new Date().getMonth(), this.state.dateOptions[0], `${i}+${index}`)}}>
                          {`${this.state.month[new Date().getMonth()]} ${this.state.dateOptions[0]}`}
                        </button>
                        <button class="dropdown-item" onClick={() => {this.setDate(new Date().getMonth(), this.state.dateOptions[1], `${i}+${index}`)}}>
                          {`${this.state.month[new Date().getMonth()]} ${this.state.dateOptions[1]}`}
                        </button>
                        <button class="dropdown-item" onClick={() => {this.setDate(new Date().getMonth(), this.state.dateOptions[2], `${i}+${index}`)}}>
                          {`${this.state.month[new Date().getMonth()]} ${this.state.dateOptions[2]}`}
                        </button>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default PlaceOrders;
