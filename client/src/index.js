import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import axios from "axios";
import { createBrowserHistory } from "history";

import * as serviceWorker from "./serviceWorker";
import App from "./components/App";
import Reducers from "./reducers";
import Homepage from "./components/Homepage/Homepage";
import Faq from "./components/FAQ/Faq";

import authGuard from "./components/HOCs/authGuard";
import adminAuthGuard from "./components/HOCs/adminAuthGuard";
import confirmationEmail from "./components/HOCs/confirmationEmail";
import changePassword from "./components/HOCs/changePassword";

import Brokers from "./components/Brokers/Brokers";
import Signals from "./components/Signals/Signals";
import Blogs from "./components/Blog/Blogs";
import Blog from "./components/Blog/Blog";
import AboutUs from "./components/AboutUs/AboutUs";
import Traders from "./components/Tables/Traders/Traders";
import Trader from "./components/Tables/Trader/Trader";

import AdminReports from './components/Admin/Reports/Reports'
import CreateReport from "./components/Admin/Reports/CreateReport/CreateReport";
import UpdateReport from "./components/Admin/Reports/UpdateReport/UpdateReport";

import AdminBlogs from "./components/Admin/Blogs/Blogs";
import CreateBlog from "./components/Admin/Blogs/CreateBlog/CreateBlog";
import UpdateBlog from "./components/Admin/Blogs/UpdateBlog/UpdateBlog";

import AdminBrokers from './components/Admin/Brokers/Brokers'
import CreateBroker from "./components/Admin/Brokers/CreateBroker/CreateBroker";
import UpdateBroker from "./components/Admin/Brokers/UpdateBroker/UpdateBroker";
import AllUsers from "./components/Admin/Users/AllUsers";
import PaidUsers from "./components/Admin/Users/PaidUsers";
import Schedules from "./components/Admin/Schedules/Schedules";
import Prices from "./components/Admin/Price/Prices";

let history = createBrowserHistory();


const jwt = localStorage.getItem("JWT");
const admin = localStorage.getItem('ADMIN');
const user = localStorage.getItem('USER');
const userId = localStorage.getItem('USER_ID');

axios.defaults.headers.common["Authorization"] = jwt;
axios.defaults.headers.common["admin"] = admin;

ReactDOM.render(
  <Provider
    store={createStore(
      Reducers,
      {
        auth: {
          token: jwt,
          isAuthenticated: jwt ? true : false,
          admin: admin ? admin : false,
          username: user,
          userId
        },
      },
      applyMiddleware(reduxThunk)
    )}
  >
    <BrowserRouter history={history}>
      <App>
        {/*MAIN ROUTES */}
        <Route exact path="/" component={Homepage} />
        <Route exact path="/FAQ" component={Faq} />
        <Route exact path="/brokers" component={Brokers} />

        <Route exact path="/blog/:id" component={Blog} />
        <Route exact path="/blog" component={Blogs} />

        <Route exact path="/signals" component={Signals} />
        <Route exact path="/about" component={AboutUs} />

        <Route exact path="/traders/:id" component={authGuard(Trader)} />
        <Route exact path="/traders" component={authGuard(Traders)} />

        {/*ADMIN ROUTES */}
        <Route exact path="/admin" component={adminAuthGuard(AdminBlogs)} />
        <Route exact path="/admin/brokers" component={adminAuthGuard(AdminBrokers)} />
        <Route exact path="/admin/reports" component={adminAuthGuard(AdminReports)} />

        <Route exact path="/admin/update/blog/:id" component={adminAuthGuard(UpdateBlog)} />
        <Route exact path="/admin/create/blog" component={adminAuthGuard(CreateBlog)} />

        <Route exact path="/admin/update/broker/:id" component={adminAuthGuard(UpdateBroker)} />
        <Route exact path="/admin/create/broker" component={adminAuthGuard(CreateBroker)} />

        <Route exact path="/admin/update/report/:id" component={adminAuthGuard(UpdateReport)} />
        <Route exact path="/admin/create/report" component={adminAuthGuard(CreateReport)} />

        <Route exact path="/admin/users/paid" component={adminAuthGuard(PaidUsers)} />
        <Route exact path="/admin/users" component={adminAuthGuard(AllUsers)} />

        <Route exact path="/admin/schedules" component={adminAuthGuard(Schedules)} />

        <Route exact path="/admin/prices" component={adminAuthGuard(Prices)} />


        {/*CHANGE PASS AND CONF ROUTES */}
        <Route path="/confirmation/:id" component={confirmationEmail(Homepage)} />
        <Route path="/changePassword/:id" component={changePassword(Homepage)} />


      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
serviceWorker.unregister();
