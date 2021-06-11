/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
// import TableSchools from "views/TableList/TableSchools.js";
import GeneralAdmin from "layouts/GeneralAdmin.js";
import LandingPage from "layouts/LandingPage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import ResetPassword from "views/LoginPage/resetPassword";
// import { Provider } from 'react-redux';
// import store from '../redux/store';
import FederalLoginPage from "views/LoginPage/FederalLoginPage.js";
import DataContext from './components/context/DataContext';

import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory(); 

const token = sessionStorage.getItem('token')
// console.log(token)

ReactDOM.render(
  // <Provider store={store}>
  
  <DataContext>
    <Router history={hist}>
      <Switch>
        <Route path="/state-admin" component={Admin} /> 
        <Route path="/admin" component={GeneralAdmin} />
        <Route path="/login-page" component={LoginPage} />
        <Route path="/federal-login-page" component={FederalLoginPage} />
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/forget-password/:emailCode" component={ResetPassword} />
      </Switch>
    </Router> 
  </DataContext>,
  // {/* </Provider>, */}
  document.getElementById("root")
);
