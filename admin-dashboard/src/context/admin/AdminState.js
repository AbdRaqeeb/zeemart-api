import React, {useReducer} from 'react';
import axios from 'axios';
import AdminContext from './adminContext';
import adminReducer from "./adminReducer";
import {
    ADMIN_ERROR,
    GET_ADMINS,
    ADD_ADMIN,
    UPDATE_ADMIN_STATUS,
    CLEAR_ADMINS,
    SET_CURRENT,
    CLEAR_FILTER,
    FILTER_ADMIN,
    CLEAR_CURRENT,
    CLEAR_ERRORS,
    DELETE_ADMIN
} from '../types';

const AdminState = (props) => {
    const initialState = {
        admins: [],
        current: null,
        filtered: null,
        error: null,
        loading: true,
        errorBool: null,
        msg: null,
    };
    const [state, dispatch] = useReducer(adminReducer, initialState);

    // Get Categories
    const getAdmins = async () => {
        try {
            const res = await axios.get('/api/v1/admin/all');

            dispatch({
                type: GET_ADMINS,
                payload: res.data.admins
            });
        } catch (err) {
            dispatch({ type: ADMIN_ERROR, payload: err.response.data });
        }
    };

    // Add Admin
    const registerAdmin = async (admin) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.post('/api/v1/admin', admin, config);

            dispatch({ type: ADD_ADMIN, payload: res.data });
        } catch (err) {
            dispatch({ type: ADMIN_ERROR, payload: err.response.data });
        }
    };


    // Update Admin Status
    const updateAdminStatus = async (admin_status) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.put('/api/v1/admin/status', admin_status, config);
            dispatch({ type: UPDATE_ADMIN_STATUS, payload: res.data });
        } catch (err) {
            dispatch({ type: ADMIN_ERROR, payload: err.response.data });
        }
    };


    // Delete admin
    const deleteAdmin = async (id) => {
        try {
            await axios.delete(`/api/v1/admin/${id}`);

            dispatch({ type: DELETE_ADMIN, payload: id });
        } catch (err) {
            dispatch({ type: ADMIN_ERROR, payload: err.response.data });
        }
    };

    // Clear Categories
    const clearCategories = () => {
        dispatch({ type: CLEAR_ADMINS });
    };

    // Set Current Categories
    const setCurrent = (admin) => {
        dispatch({ type: SET_CURRENT, payload: admin });
    };

    // Clear Current Categories
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    // Filter Categories
    const filterAdmins = (text) => {
        dispatch({ type: FILTER_ADMIN, payload: text });
    };

    // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    // Clear errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

    return (
        <AdminContext.Provider
            value={{
                admins: state.admins,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                loading: state.loading,
                errorBool: state.errorBool,
                msg: state.msg,
                getAdmins,
                registerAdmin,
                updateAdminStatus,
                clearCategories,
                clearCurrent,
                clearFilter,
                setCurrent,
                filterAdmins,
                clearErrors,
                deleteAdmin
            }}
        >
            {props.children}
        </AdminContext.Provider>
    )
};

export default AdminState;