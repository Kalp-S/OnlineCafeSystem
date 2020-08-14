import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import data from '../../data/users';
import HeaderCaterer from '../header/headerCatererComponent';
import './caterer.css';

const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 1000,
});
class Caterer extends Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleIngredientsChange = this.handleIngredientsChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    const info = this.props.location.state.info ? this.props.location.state.info :  this.props.location.state.item.data;
    this.state = {
      employees: [],
      info: info,
      email: '',
      name: '',
      ingredients: '',
      price: '',
      type: '',
      header: ['Appetizers', 'Entrees', 'Main Menu', 'Desserts'],
      menu: [],
      state: 1,
      redirect: null,
    };
    this.viewMenu();
  }

  handleNameChange(text) {
    this.setState({
      name: text.target.value,
    });
  }

  handleIngredientsChange(text) {
    this.setState({
      ingredients: text.target.value,
    });
  }

  handlePriceChange(text) {
    this.setState({
      price: text.target.value,
    });
  }

  handleTypeChange(text) {
    this.setState({
      type: text.target.value,
    });
  }

  async viewMenu() {
    let res = null;
      this.setState({
        menu:[],
      });
    const data = await instance.post('/menu/view', {
    }).catch((e) => {
      res = e.response;
    });
    const appetizers = [];
    const entrees = [];
    const mainMenu = [];
    const desserts = [];
    data.data.forEach((item) => {
      if (item.type === 'Appetizers') {
        appetizers.push(item);
      } else if (item.type === 'Entrees') {
        entrees.push(item);
      } else if (item.type === 'Main Menu') {
        mainMenu.push(item);
      } else if (item.type === 'Desserts') {
        desserts.push(item);
      }
    });
    const menu = [];
    menu.push(appetizers);
    menu.push(entrees);
    menu.push(mainMenu);
    menu.push(desserts);
    if (res == null) {
      this.setState({
        menu:menu,
      });
    }
    console.log(menu)
  }

  async addMenu() {
    let res = null;
    const {name} = this.state
    const {ingredients} = this.state
    const {price} = this.state
    const {type} = this.state
    const isAvailable = "true"
    const data = await instance.post('/menu/add', {
      name,
      ingredients,
      price,
      type,
      isAvailable
    }).catch((e) => {
      res = e.response;
    });
    this.viewMenu()
  }

  async updateMenu(id,name,isAvailable) {
    let res = null;
    const data = await instance.post('/menu/update', {
      id,
      name,
      isAvailable
    }).catch((e) => {
      res = e.response;
    });
    this.viewMenu()
  }

  render() {
    return (
      <div className="User">
        <HeaderCaterer info={this.state.info} />
        {this.state.menu.map((list, ind) => (
          <div>
            <div className="font-italic  User-today sticky-top">
              <h2>
                {this.state.header[ind]}
              </h2>

              <div className="User-line" />
              <button type="button" className="btn float-right btn-primary" style={{ marginTop: '1%', marginRight: '1%', marginBottom: '1%' }} data-toggle="modal" data-target="#removeEmployee">
                Add Item
              </button>
            </div>
              {list.map((item, i) => (
              <div>
                <div
                  className="card mb-3 "
                  style={{
                    width: '70%',
                    marginTop: '2%',
                    marginLeft: '2%',
                  }}
                >
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <img
                        src={data[(ind + i) %6]}
                        className="card-img catererImg"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">
                          {' '}
                          {item.name}
                          {' '}
                        </h5>
                        <p className="card-text">
                          {' '}
                          {item.ingredients}
                          {' '}
                        </p>
                        <p className="card-text">
                          {' '}
                          {`$${item.price}`}
                          {' '}
                          {' '}
                        </p>
                      </div>

                      {item.isAvailable != "true" ? <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => { this.updateMenu(item.id, item.name, "true"); }}
                      >
                        {' '}
                        Add to Main Menu
                        {' '}
                      </button> :
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {this.updateMenu(item.id, item.name,"false"); }}
                      >
                        {' '}
                        delete from Main Menu
                        {' '}
                      </button>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div className="modal fade" id="removeEmployee" tabIndex="-1" role="dialog" aria-labelledby="removeEmployeeLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="removeEmployeeLabel">Enter Information</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form noValidate autoComplete="off">
                  <div>
                    <TextField
                      id="standard-name-input"
                      label="Name"
                      type="name"
                      value={this.state.name}
                      onChange={this.handleNameChange}
                    />
                  </div>
                </form>
                <form noValidate autoComplete="off">
                  <div>
                    <TextField
                      id="standard-ingredients-input"
                      label="Ingredients"
                      type="ingredients"
                      value={this.state.ingredients}
                      onChange={this.handleIngredientsChange}
                    />
                  </div>
                </form>
                <form noValidate autoComplete="off">
                  <div>
                    <TextField
                      id="standard-price-input"
                      label="Price"
                      type="price"
                      value={this.state.price}
                      onChange={this.handlePriceChange}
                    />
                  </div>
                </form>
                <div class="custom-control custom-radio custom-control-inline">
                  <input type="radio" id="customRadioInline1" name="customRadioInline1" class="custom-control-input" onClick={() => {this.setState({type:this.state.header[0]})}} />
                  <label class="custom-control-label" for="customRadioInline1">{this.state.header[0]}</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input type="radio" id="customRadioInline2" name="customRadioInline1" class="custom-control-input" onClick={() => {this.setState({type:this.state.header[1]})}}/>
                  <label class="custom-control-label" for="customRadioInline2">{this.state.header[1]}</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input type="radio" id="customRadioInline3" name="customRadioInline1" class="custom-control-input"onClick={() => {this.setState({type:this.state.header[2]})}}/>
                  <label class="custom-control-label" for="customRadioInline3">{this.state.header[2]}</label>
                </div>
                <div class="custom-control custom-radio custom-control-inline">
                  <input type="radio" id="customRadioInline4" name="customRadioInline1" class="custom-control-input"onClick={() => {this.setState({type:this.state.header[3]})}}/>
                  <label class="custom-control-label" for="customRadioInline4">{this.state.header[3]}</label>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary"  data-dismiss="modal" onClick={() => {
                  this.addMenu();
                }}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Caterer;
