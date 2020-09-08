import React, {useReducer} from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from "../../utils/setAuthToken";
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT,
    CLEAR_ERRORS,
    UPDATE_USER,
    UPDATE_PASSWORD,
    PASSWORD_ERROR
} from '../types';


const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        users: {},
        msg: null,
        errorBool: null,
        errorMsg: null,
        error: null
    };
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load user
    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }

        try {
            const res = await axios.get('/api/v1/admin');

            dispatch({
                type: USER_LOADED,
                payload: res.data,
            });
        } catch (err) {
            dispatch({
                type: AUTH_ERROR,
            });
        }
    };

    //Login user
    const login = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        };

        try {
            const res = await axios.post('/api/v1/admin/login', formData, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
            await loadUser();
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data,
            });
        }
    };

    // Update Admin
    const updateUser = async (user) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.put('/api/v1/admin', user, config);
            dispatch({ type: UPDATE_USER, payload: res.data });
        } catch (err) {
            dispatch({ type: PASSWORD_ERROR, payload: err.response.data });
        }
    };


    // Update Admin Password
    const updatePassword = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.put('/api/v1/admin/password', formData, config);
            dispatch({ type: UPDATE_PASSWORD, payload: res.data });
        } catch (err) {
            dispatch({ type: PASSWORD_ERROR, payload: err.response.data });
        }
    };

    // Logout
    const logout = () => dispatch({ type: LOGOUT });

    // Clear errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                users: state.users,
                errorBool: state.errorBool,
                errorMsg: state.errorMsg,
                error: state.error,
                msg: state.msg,
                loadUser,
                login,
                logout,
                clearErrors,
                updateUser,
                updatePassword
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
};

export default AuthState;