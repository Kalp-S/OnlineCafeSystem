import React from 'react';
import { Route, Switch } from 'react-router-dom';
import User from './components/user/userView';
import Company from './components/company/companyView';
import PlaceOrders from './components/placeOrders/placeOrdersView';
import ViewOrders from './components/viewOrders/viewOrdersView';
import Login from './components/login/loginView';
import Register from './components/register/registerView';
import Settings from './components/settings/settingsView'
import Caterer from './components/caterer/catererView';
import CatererViewOrders from './components/catererViewOrders/CatererViewOrdersView';
const Routes = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/user" component={User} />
      <Route path="/placeOrders" component={PlaceOrders} />
      <Route path="/viewOrders" component={ViewOrders} />
      <Route path="/settings" component={Settings} />
      <Route path="/company" component={Company} />
      <Route path="/caterer" component={Caterer} />
      <Route path="/catererOrders" component={CatererViewOrders} />

    </Switch>
  </div>
);

export default Routes;
