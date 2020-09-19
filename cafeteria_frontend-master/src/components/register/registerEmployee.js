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
  baseURL: 'http://localhost:3001/register/employee',
  timeout: 1000,
});

class Employee extends Component {
  constructor(props) {
    super(props);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      companyName: '',
      state: 1,
      redirect: null,
    };
  }

  handleFirstNameChange(text) {
    this.setState({
      firstName: text.target.value,
    });
  }

  handleLastNameChange(text) {
    this.setState({
      lastName: text.target.value,
    });
  }

  handleEmailChange(text) {
    this.setState({
      email: text.target.value,
    });
  }

  handlePasswordChange(text) {
    this.setState({
      password: text.target.value,
    });
  }

  handleCompanyNameChange(text) {
    this.setState({
      companyName: text.target.value,
    });
  }

  async register() {
    let res = null;
    const { email } = this.state;
    const { password } = this.state;
    const { firstName } = this.state;
    const { lastName } = this.state;
    const { companyName } = this.state;
    const data = await instance.post('/', {
      email,
      password,
      firstName,
      lastName,
      companyName,
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
      {console.log(JSON.stringify(this.props))}

        {this.state.state == 0
          ? (
            <div className="alert alert-danger employee-alert" role="alert">
              Invalid Credentials
            </div>
          ) : <div />}
        <form noValidate autoComplete="off">
          <div>
            <TextField
              id="standard-name-input"
              label="First Name"
              type="firstname"
              value={this.state.firstName}
              onChange={this.handleFirstNameChange}
            />
          </div>
        </form>
        <form noValidate autoComplete="off">
          <div>
            <TextField
              id="standard-name-input"
              label="Last Name"
              type="lastname"
              value={this.state.lastName}
              onChange={this.handleLastNameChange}
            />
          </div>
        </form>
        <form noValidate autoComplete="off">
          <div>
            <TextField
              id="standard-company-input"
              label="Company"
              type="company"
              value={this.state.companyName}
              onChange={this.handleCompanyNameChange}
            />
          </div>
        </form>
        <form noValidate autoComplete="off">
          <div>
            <TextField
              id="standard-email-input"
              label="Email"
              type="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
          </div>
        </form>
        <form noValidate autoComplete="off">
          <div>
            <TextField
              id="standard-password-input"
              label="Password"
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </div>
        </form>
        <Button component={Link} to="/">Login</Button>
        <Button onClick={() => { this.register(); }}>Register</Button>
      </div>
    );
  }
}
export default (Employee);
