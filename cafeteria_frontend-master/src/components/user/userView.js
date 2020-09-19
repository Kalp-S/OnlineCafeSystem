import React, { Component } from 'react';
import data from '../../data/users'
import banner from '../../images/banner.jpg';
import banner2 from '../../images/banner2.jpg';
import banner3 from '../../images/banner3.jpg';
import banner4 from '../../images/banner4.jpg';
import banner5 from '../../images/banner5.jpg';
import Header from '../header/headerComponent';
import './User.css';
const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 1000,
});
class User extends Component {
  constructor(props) {
    super(props);
    const info = this.props.location.state.info ? this.props.location.state.info :  this.props.location.state.item.data;
    const date = [];
    this.state = {
      info: info,
      menu: {},
      cart: [],
      err: 0,
      date:{},
      month:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      today:[],
      tomorrow:[],
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
          item.menu = this.state.menu[item.menuId]
          if(parseInt(item.day) === new Date().getDate()){
            let today = this.state.today;
            today.push(item);
            console.log(item);
            this.setState({
              today: today
            })
          }else if(parseInt(item.day) === new Date().getDate()+1){
            let tomorrow = this.state.tomorrow;
            tomorrow.push(item);
            console.log(item);
            this.setState({
              tomorrow: tomorrow
            })
          }
        });
      }
    }
    console.log(JSON.stringify(this.state.cart));
  }
  getTodaysLunch() {
    return [];
  }

  getTomorrowsLunch() {
    return [];
  }

  isPastLunch() {
    const date = new Date();
    return date.getHours() > 12 ? date.getMinutes() > 0 : false;
  }

  getDate() {
    const date = new Date();
    return new Date(date.getTime()).toDateString();
  }

  getTomorrowsDate() {
    const date = new Date();
    return new Date(date.getTime() + (60 * 60 * 24 * 1000)).toDateString();
  }

  render() {
    return (
      <div className="User">
        <Header info={this.state.info}/>
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active carousel-transform">
              <img src={banner} className="d-block w-90 carousel-img " />
            </div>
            <div className="carousel-item carousel-transform">
              <img src={banner2} className="d-block w-90 carousel-img " />
            </div>
            <div className="carousel-item carousel-transform">
              <img src={banner3} className="d-block w-90 carousel-img " />
            </div>
            <div className="carousel-item carousel-transform">
              <img src={banner4} className="d-block w-90 carousel-img " />
            </div>
            <div className="carousel-item carousel-transform">
              <img src={banner5} className="d-block w-90 carousel-img " />
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div>
        {!this.isPastLunch()
          ? (
            <div className="font-italic  User-today sticky-top">
              <h2>
                {this.getDate()}
              </h2>
              <div className="User-line" />
            </div>
          ) : <div /> }

        { !this.isPastLunch() ? this.state.today.map((item) => (
          <div>

            <div className="card mb-3" style={{ width: '70%', marginTop: '2%', marginLeft: '2%' }}>
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img src={data[Math.floor(Math.random() * Math.floor(6)) +1]} className="card-img MenuImg" />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{item.menu.name}</h5>
                    <p className="card-text">{item.menu.ingredients}</p>
                    <p className="card-text">
                      {`$${item.menu.price}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )) : <div />}

        <div className="font-italic  User-today sticky-top">
          <h2>{this.getTomorrowsDate()}</h2>
          <div className="User-line" />
        </div>
        { this.state.tomorrow.map((item) => (
          <div className="card mb-3" style={{ width: '70%', marginTop: '2%', marginLeft: '2%' }}>
            <div className="row no-gutters">
              <div className="col-md-4">
                <img src={data[Math.floor(Math.random() * Math.floor(6)) +1]} className="card-img MenuImg" />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{item.menu.name}</h5>
                  <p className="card-text">{item.menu.ingredients}</p>
                  <p className="card-text">
                    {`$${item.menu.price}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

      </div>
    );
  }
}

export default User;
