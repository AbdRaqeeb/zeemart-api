import React, {useReducer} from 'react';
import axios from 'axios';
import CustomerContext from './customerContext';
import customerReducer from "./customerReducer";
import {
    GET_CUSTOMERS,
    FILTER_CUSTOMERS,
    CLEAR_FILTER,
    CUSTOMER_ERROR,
} from '../types';


const CustomerState = (props) => {
    const initialState = {
        customers: [],
        filtered: null,
        error: null,
        loading: true
    };
    const [state, dispatch] = useReducer(customerReducer, initialState);

    // Get Categories
    const getCustomers = async () => {
        try {
            const res = await axios.get('/api/v1/users/all');

            await dispatch({
                type: GET_CUSTOMERS,
                payload: res.data.users
            });
        } catch (err) {
            await dispatch({ type: CUSTOMER_ERROR, payload: err.response.data });
        }
    };

    // Filter Categories
    const filterCustomers = (text) => {
        dispatch({ type: FILTER_CUSTOMERS, payload: text });
    };

    // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    return (
        <CustomerContext.Provider
            value={{
                customers: state.customers,
                filtered: state.filtered,
                error: state.error,
                loading: state.loading,
                getCustomers,
                clearFilter,
                filterCustomers
            }}
        >
            {props.children}
        </CustomerContext.Provider>
    )
};

export default CustomerState;