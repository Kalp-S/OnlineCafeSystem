import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';

class HeaderCompany extends Component {
  constructor(props) {
    super(props);
    const info = this.props.info ? this.props.info : {};
    this.state = {
      info,
    };
  }

  getName() {
    return 'Shaggus Chonk';
  }

  getCompanyName() {
    return 'Bethesda';
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link to={{
          pathname: '/company',
          state: {
            info: this.state.info,
          },
        }}
        >
          <a className="navbar-brand">Home</a>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={{
                pathname: '/settings',
                state: {
                  info: this.state.info,
                },
              }}
              >
                <a className="nav-link" href="#/settings">Settings</a>
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#/">Logout</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
export default HeaderCompany;
