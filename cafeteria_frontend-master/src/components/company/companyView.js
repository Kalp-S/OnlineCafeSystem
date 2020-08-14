import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import burger from '../../images/burger.jpg';
import chicken from '../../images/chicken.jpg';
import roti from '../../images/food1.jpg';
import toast from '../../images/toast.jpg';
import wagyu from '../../images/wagyu.jpg';
import banner from '../../images/banner.jpg';
import Header from '../header/headerCompanyComponent';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router';

import './Company.css';
const axios = require('axios');
const data = require('../../data/users');
const instance = axios.create({
  baseURL: 'http://localhost:3001/company',
  timeout: 1000,
});
class Company extends Component {
  constructor(props) {
    super(props);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    const info = this.props.location.state ? this.props.location.state.item.data :  [];
    this.state = {
      employees: [],
      info: info,
      email: "",
      firstName:"",
      lastName:"",
      phoneNumber:"",
      state: 1,
      redirect: null,
    };
    this.view();
  }

  async view() {
    let res = null;
    const { companyName } = this.state.info;
    const items = await instance.post('/view',{
      companyName
    }).catch((e) => {
      res = e.response;
    });
    if (res == null) {
      this.setState({
        employees: items.data,
      });
    }
  }

  async add() {
    let res = null;
    const { companyName } = this.state.info;
    const { email } = this.state;
    const { firstName } = this.state;
    const { lastName } = this.state;
    console.log(this.state)
    const items = await instance.post('/add',{
      companyName,
      email,
      firstName,
      lastName
    }).catch((e) => {
      res = e.response;
    });
    await this.view()
  }

  async delete() {
    let res = null;
    const { companyName } = this.state.info;
    const { email } = this.state;
    console.log(email);
    const items = await instance.post('/delete',{
      companyName,
      email
    }).catch((e) => {
      res = e.response;
    });
    await this.view();
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

  handlePhoneNumberChange(text) {
    this.setState({
      phoneNumber: text.target.value,
    });
  }

  render() {
    return (
      <div className="User">
        <Header info={this.state.info}/>
        <button type="button" class="btn float-right btn-danger" style={{ marginTop: '1%', marginRight: '1%', marginBottom: '1%' }} data-toggle="modal" data-target="#removeEmployee">
          Remove Employee
        </button>
        <button type="button" class="btn float-right btn-primary" style={{ marginTop: '1%', marginRight: '1%', marginBottom: '1%' }} data-toggle="modal" data-target="#addEmployee">
          Add Employee
        </button>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
            </tr>
          </thead>

          <tbody>
            {this.state.employees.map((item, i) =>
              <tr key={item.index}>
                <th scope="row">{i}</th>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
              </tr>
            )}

          </tbody>
        </table>
        <div class="modal fade" id="addEmployee" tabindex="-1" role="dialog" aria-labelledby="addEmployeeLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="addEmployeeLabel">Enter Information</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
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
                    id="standard-phone-input"
                    label="Phone Number"
                    type="phone"
                    value={this.state.phoneNumber}
                    onChange={this.handlePhoneNumberChange}
                  />
                </div>
              </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary"  data-dismiss="modal" onClick={() => {
                  this.add();
                }}>Save changes</button>
              </div>
            </div>
          </div>
        </div>

        <div class="modal fade" id="removeEmployee" tabindex="-1" role="dialog" aria-labelledby="removeEmployeeLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="removeEmployeeLabel">Enter Information</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
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
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary"  data-dismiss="modal" onClick={() => {
                  this.delete();
              }}>Delete Employee</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Company);
