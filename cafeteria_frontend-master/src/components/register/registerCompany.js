import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { Link, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import './Register.css';

const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:3001/register/company',
  timeout: 1000,
});

class Company extends Component {
  constructor(props) {
    super(props);
    this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.handlePostalCodeChange = this.handlePostalCodeChange.bind(this);
    this.handleContactNameChange = this.handleContactNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.state = {
      companyName: '',
      address: '',
      city: '',
      postalCode: '',
      contactName: '',
      email: '',
      phone: '',
      password: '',
      state: 1,
      redirect: null,
    };
  }

  handleCompanyNameChange(text) {
    this.setState({
      companyName: text.target.value,
    });
  }

  handleAddressChange(text) {
    this.setState({
      address: text.target.value,
    });
  }

  handleCityChange(text) {
    this.setState({
      city: text.target.value,
    });
  }

  handlePostalCodeChange(text) {
    this.setState({
      postalCode: text.target.value,
    });
  }

  handleContactNameChange(text) {
    this.setState({
      contactName: text.target.value,
    });
  }

  handleEmailChange(text) {
    this.setState({
      email: text.target.value,
    });
  }

  handlePhoneChange(text) {
    this.setState({
      phone: text.target.value,
    });
  }

  handlePasswordChange(text) {
    this.setState({
      password: text.target.value,
    });
  }
  async register() {
    let res = null;
    const { companyName } = this.state;
    const { address } = this.state;
    const { city } = this.state;
    const { postalCode } = this.state;
    const { contactName } = this.state;
    const { email } = this.state;
    const { phone } = this.state;
    const { password } = this.state;
    const data = await instance.post('/', {
      companyName,
      address,
      city,
      postalCode,
      contactName,
      email,
      phone,
      password,
    }).catch((e) => {
      res = e.response;
      this.setState({
        state: 0,
      });
    });
    if (res == null) {
      this.setState({
        redirect: '/',
      });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div>
        <form noValidate autoComplete="off" style={{ display: 'table' }}>
          <div style={{ display: 'table-cell' }}>
            <TextField
              id="standard-company-input"
              label="Company"
              type="company"
              value={this.state.companyName}
              onChange={this.handleCompanyNameChange}
            />
          </div>
          <div style={{ display: 'table-cell' }}>
            <TextField
              id="standard-address-input"
              label="Address"
              type="address"
              value={this.state.address}
              onChange={this.handleAddressChange}
              style={{ marginLeft: '5%' }}
            />
          </div>
        </form>
        <form noValidate autoComplete="off" style={{ display: 'table' }}>
          <div style={{ display: 'table-cell' }}>
            <TextField
              id="standard-city-input"
              label="City"
              type="city"
              value={this.state.city}
              onChange={this.handleCityChange}
            />
          </div>
          <div style={{ display: 'table-cell' }}>
            <TextField
              id="standard-postal-input"
              label="Postal Code"
              type="postalCode"
              value={this.state.postalCode}
              onChange={this.handlePostalCodeChange}
              style={{ marginLeft: '5%' }}
            />
          </div>
        </form>
        <form noValidate autoComplete="off" style={{ display: 'table' }}>
          <div style={{ display: 'table-cell' }}>
            <TextField
              id="standard-name-input"
              label="Contact Name"
              type="name"
              value={this.state.contactName}
              onChange={this.handleContactNameChange}
            />
          </div>
          <div style={{ display: 'table-cell' }}>
            <TextField
              id="standard-email-input"
              label="Contact email"
              type="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
              style={{ marginLeft: '5%' }}
            />
          </div>
        </form>
        <form noValidate autoComplete="off" style={{ display: 'table' }}>
          <div style={{ display: 'table-cell' }}>
            <TextField
              id="standard-phone-input"
              label="Phone Number"
              type="phone number"
              value={this.state.phone}
              onChange={this.handlePhoneChange}
            />
          </div>
          <div style={{ display: 'table-cell' }}>
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              value={this.state.handlePasswordChange}
              onChange={this.handlePasswordChange}
              style={{ marginLeft: '5%' }}
            />
          </div>
        </form>
        <Button component={Link} to="/">Login</Button>
        <Button onClick={() => { this.register(); }}>Register</Button>
      </div>
    );
  }
}
export default Company;
