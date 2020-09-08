import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'jquery';
import 'popper.js';
import 'bootstrap';
import './assets/css/login.css';
import SnackbarProvider from 'react-simple-snackbar';
import Auth from "./Components/Auth/Auth";
import ProductState from './context/product/ProductState';
import AuthState from './context/auth/AuthState';
import CategoryState from "./context/category/CategoryState";
import CustomerState from "./context/customers/CustomerState";
import OrderState from "./context/orders/OrderState";
import AdminState from "./context/admin/AdminState";
import TypeState from "./context/type/TypeState";
import PrivateRoute from "./Components/Routing/PrivateRoute";
import setAuthToken from "./utils/setAuthToken";

// CSS files
import './assets/css/App.css';
import './assets/css/style.css';
import './assets/css/custom.css';
import './assets/fonts/flaticon/flaticon.css';
import './assets/fonts/flaticon2/flaticon2.css';
import './assets/fonts/line-awesome/line-awesome.css';
import './assets/fonts/fontawesome/css/fontawesome.css';
import 'typeface-poppins';
import 'typeface-roboto';

import HeaderMobile from "./Components/layouts/HeaderMobile";
import Home from "./Components/Pages/Home";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    return (
        <AuthState>
            <AdminState>
                <CustomerState>
                    <TypeState>
                        <CategoryState>
                            <ProductState>
                                <OrderState>
                                    <Router>
                                    <SnackbarProvider>
                                            <Switch>
                                                <Route path="/login" component={Auth}/>
                                                <PrivateRoute path="/" component={Home}/>
                                            </Switch>
                                        </SnackbarProvider>
                                    </Router>
                                </OrderState>
                            </ProductState>
                        </CategoryState>
                    </TypeState>
                </CustomerState>
            </AdminState>
        </AuthState>
    )
        ;
};


const body = "kt-quick-panel--right kt-demo-panel--right kt-offcanvas-panel--right kt-header--fixed kt-header-mobile--fixed kt-subheader--fixed kt-subheader--enabled kt-subheader--solid kt-aside--enabled kt-aside--fixed kt-page--loading";
const container = "kt-grid kt-grid--hor kt-grid--root";
const sign_container = "kt-grid kt-grid--ver kt-grid--root";

export default App;
