import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import './Register.css';
import Employee from './registerEmployee';
import Company from './registerCompany';

class RegisterView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      width: 0,
      email: '',
      password: '',
      id: -1,
      form: 1,
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
    console.log(text);
    this.setState({
      email: text.target.value,
    });
  }

  handlePasswordChange(text) {
    this.setState({
      password: text.target.value,
    });
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
            <ButtonGroup className="Login-buttonGroup" color="white" aria-label="outlined primary button group">
              <Button onClick={() => { this.setState({ form: 1 }); }}>Employee</Button>
              <Button onClick={() => { this.setState({ form: 2 }); }}>Company</Button>
              <Button disabled>Caterer</Button>
            </ButtonGroup>
            {this.state.form == 1 ? <Employee /> : <Company />}
          </div>
        </div>
      </div>
    );
  }
}
export default RegisterView;
