import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import './Login.css';

const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:3001/login',
  timeout: 1000,
});

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      width: 0,
      email: '',
      password: '',
      id: -1,
      state: -1,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
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

  async login() {
    let res;
    const { email } = this.state;
    const { password } = this.state;
    const item = await instance.post('/', {
      email,
      password,
    }).catch((e) => res = e.response);
    if(res){
      console.log(res)
    } else if(item.data.type == "Employee"){
      this.props.history.push({
      pathname: '/user',
      state: {
        item,
      },
    });
  } else if(item.data.type == "Company"){
    this.props.history.push({
    pathname: '/company',
    state: {
      item,
    },
  });
} else {
  this.props.history.push({
  pathname: '/caterer',
  state: {
    item,
  },
});
}
  }

  render() {
    return (
      <div style={{
        height: this.state.height,
        width: this.state.width,
      }}
      >
        <div className="Login-background">
          <div className="Login-outline">
            <form noValidate autoComplete="off">
              <div>
                <TextField
                  id="standard-username-input"
                  value={this.state.email}
                  onChange={this.handleEmailChange}
                  label="E-mail"
                  type="username"
                  autoComplete="current-username"
                />
              </div>
            </form>
            <form noValidate autoComplete="off">
              <div>
                <TextField
                  id="standard-password-input"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                />
              </div>
            </form>
            <ButtonGroup className="Login-buttonGroup" color="white" aria-label="outlined primary button group">
              <Button component={Link} to="/register">Register</Button>
              <Button onClick={() => { this.login(); }}>Login</Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(LoginView);
