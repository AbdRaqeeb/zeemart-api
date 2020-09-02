import React, {useContext} from "./node_modules/react";
import { Route, Redirect } from './node_modules/react-router-dom'
import AuthContext from "../../context/auth/authContext";


const PrivateRoute = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, loading  } = authContext;
    return (
        <Route { ...rest } render={props => !isAuthenticated && !loading ? (
            <Redirect to='/login' />
        ) : (
            <Component {...props} />
        )} />
    );
};

export default PrivateRoute;