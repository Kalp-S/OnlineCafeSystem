import React, { Component } from 'react';
import Header from '../header/headerComponent';
import './settings.css';
const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:3001/settings',
  timeout: 1000,
});


class Settings extends Component {
  constructor(props) {
    super(props);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
    this.handleExpiryDateChange = this.handleExpiryDateChange.bind(this);
    this.handleCvcNumberChange = this.handleCvcNumberChange.bind(this);

    const info = this.props.location.state ? this.props.location.state.info : {};
    this.state = {
      info:info
    };
    if (!this.state.info.cvcNumber){
      this.state.info.cvcNumber="Please Enter Info";
      this.state.info.expiryDate="Please Enter Info";
      this.state.info.cardNumber="Please Enter Info";
    }
    console.log(JSON.stringify(info));
  }

  handlePasswordChange(text) {
    this.state.info.password = text.target.value;
  }

  handleFirstNameChange(text) {
    this.state.info.firstName = text.target.value;
  }

  handleLastNameChange(text) {
    this.state.info.lastName = text.target.value;
  }

  handleEmailChange(text) {
    this.state.info.email = text.target.value;
  }

  handleCardNumberChange(text) {
    this.state.info.cardNumber = text.target.value;
  }

  handleExpiryDateChange(text) {
    this.state.info.expiryDate = text.target.value;
  }

  handleCvcNumberChange(text) {
    this.state.info.cvcNumber = text.target.value;
  }

  async updateInformation() {
    let res;
    const { email } = this.state.info;   
    const { password } = this.state.info;
    
    const { companyName } = this.state.info;   
    const { firstName } = this.state.info;

    const { lastName } = this.state.info;   
    const { cardNumber } = this.state.info;

    const { expiryDate } = this.state.info;   
    const { cvcNumber } = this.state.info;
    console.log(JSON.stringify(this.state.info));

    const item = await instance.post('/employee/update', {
      email,
      password,
      companyName,
      firstName,
      lastName,
      cardNumber,
      expiryDate,
      cvcNumber,
    }).catch((e) => res = e.response);
    if(res){
      console.log(res)
  }
}


  render() {
    return (
      <div className="User">
        <Header info={this.state.info}/>
        <div className="font-italic  User-today sticky-top">
          <h2>
            Settings
          </h2>
          <div className="User-line" />
        </div>

          <div>
          <div class="row">
             <div className="card mb-3 center">
                <form>
                    <legend>Name Information</legend>
                    <div class="row">

                    <div class="col" align="center">
                        <div class="center">
                        <div class="form-group">
                          <label>First Name</label>
                          <div class="col"align="left">
                            <input type="text" class="form-control" id="fName" placeholder={this.state.info.firstName}
                            onChange={this.handleFirstNameChange}></input>
                          </div>
                          </div>
                          </div>
                    </div>
                    <div class="col" align="center">
                          <div class="center">
                            <label>Last Name</label>
                            <div class="col" align="left">
                            <input type="text" class="form-control" id="lName" placeholder={this.state.info.lastName}
                            onChange={this.handleLastNameChange}></input>
                            </div>
                          </div>
                          </div>
                          
                          <div class="col" align="center">
                          <div class="center">
                            <label>Email</label>
                            <div class="col" align="left">
                            <input type="text" readonly class="form-control" id="email" placeholder={this.state.info.email}
                            onChange={this.handleEmailChange}></input>
                            </div>
                          </div>
                          </div>
                    </div>
                </form>
              </div>
          </div>
            <div class="row">
                           <div className="card mb-3 center">
                <form>
                  <legend>Card Information</legend>
                  <div class="row">

                    <div class="col" align="center">
                      <div class="center">
                        <label >Card Number</label>
                        <div class="col" align="left">
                          <input type="text" class="form-control" id="cardNum" placeholder={this.state.info.cardNumber}
                          onChange={this.handleCardNumberChange}></input>
                        </div>
                      </div>
                    </div>
                    <div class="col" align="center">
                      <div class="center">
                        <label>Expiry Date</label>
                        <div class="col" align="left">
                          <input type="text" class="form-control" id="expDate" placeholder={this.state.info.expiryDate}
                          onChange={this.handleExpiryDateChange}></input>
                        </div>
                      </div>
                    </div>

                    <div class="col"align="center">
                      <div class="center">
                        <label>CVC Number</label>
                        <div class="col" align="left">
                          <input type="text" class="form-control" id="cvcNum" placeholder={this.state.info.cvcNumber}
                          onChange={this.handleCvcNumberChange}></input>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div class="row">
             <div className="card mb-3 center">
                <form>
                    <legend>Login Info</legend>
                    <div class="row">
                      
                    <div class="col" align="center">
                        <div class="">
                          <label>Password</label>
                          <div class="col" align="center">
                            <input type="text" class="form-control" id="pass" placeholder={this.state.info.password}
                            onChange={this.handlePasswordChange} ></input>
                          </div>
                          </div>
                    </div>
                    </div>
                </form>
              </div>
          </div>
          <button type="submit" id="updateButton" class="btn btn-primary" onClick={() => {
                  this.updateInformation();
              }}>Update</button>
          </div>
      </div>
    );
  }
}

export default Settings;
