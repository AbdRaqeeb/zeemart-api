import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Dashboard from "../../../dashboard/Dashboard";
import Customers from "../../../Customers/Customers";
import Orders from "../../../Orders/Orders";
import Category from "../../../Category/Category";
import Products from "../../../Products/Products";
import Users from "../../../Users/Users";
import Admin from "../../../Admin/Admin";
import Types from "../../../Types/Types";
import SnackbarProvider from 'react-simple-snackbar';

const Content = () => {
    return (
        <Router>
            <Fragment>
                <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                    {/*eslint-disable-next-line*/}
                    <SnackbarProvider>
                        <Switch>
                            <Route path="/customers" component={Customers}/>
                            <Route path="/orders" component={Orders}/>
                            <Route path="/category" component={Category}/>
                            <Route path="/type" component={Types}/>
                            <Route path="/products" component={Products}/>
                            <Route path="/user" component={Users}/>
                            <Route path="/admin" component={Admin}/>
                            <Route path="/" component={Dashboard}/>
                        </Switch>
                    </SnackbarProvider>
                </div>
            </Fragment>
        </Router>
    );
};

export default Content;