import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    AUTH_ERROR,
    USER_LOADED,
    LOGOUT,
    CLEAR_ERRORS,
    UPDATE_USER,
    UPDATE_PASSWORD, PASSWORD_ERROR
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                users: action.payload.admin,
            };

        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
                msg: action.payload.msg,
                users: action.payload.admin
            };

        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: null,
                loading: false,
                users: null,
                error: null
            };


        case LOGIN_FAIL:
            return {
                ...state,
                token: null,
                isAuthenticated: null,
                loading: false,
                users: null,
                errorBool: action.payload.error,
                errorMsg: action.payload.msg,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                errorBool: null,
                errorMsg: null,
            };

        case UPDATE_USER:
            return {
              ...state,
              msg: action.payload.msg,
              users: action.payload.updatedUser,
              loading: false
            };

        case UPDATE_PASSWORD:
            console.log("PASSWORD: ", action.payload);
            return {
                ...state,
                msg: action.payload.msg,
                loading: false
            };

        case PASSWORD_ERROR:
            return  {
                ...state,
                errorBool: action.payload.error,
                msg: action.payload.msg,
                error: action.payload
            };

        default:
            return state;
    }
}
