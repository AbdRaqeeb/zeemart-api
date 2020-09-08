import React, {useReducer} from 'react';
import axios from 'axios';
import OrderContext from './orderContext';
import orderReducer from "./orderReducer";
import {
    GET_ORDERS,
    ORDER_ERROR,
    FILTER_ORDERS_BY_NAME,
    FILTER_ORDERS_BY_STATUS,
    FILTER_ORDERS_BY_TYPE,
    UPDATE_ORDER,
    CLEAR_FILTER,
    SET_CURRENT,
    CLEAR_CURRENT,
    GET_ORDER
} from '../types';

const OrderState = (props) => {
    const initialState = {
        orders: [],
        orderDetails: null,
        filtered: null,
        error: null,
        loading: true,
        current: null,
        errorBool: null,
        msg: null
    };
    const [state, dispatch] = useReducer(orderReducer, initialState);

    // Get Categories
    const getOrders = async () => {
        try {
            const res = await axios.get('/api/v1/orders');

            dispatch({
                type: GET_ORDERS,
                payload: res.data.orders
            });
        } catch (err) {
            dispatch({ type: ORDER_ERROR, payload: err.response.data });
        }
    };

    const getOneOrder = async (id) => {
        try {
            const res = await axios.get(`/api/v1/orders/${id}`);

            dispatch({
                type: GET_ORDER,
                payload: res.data.order
            })
        } catch (err) {
            dispatch({ type: ORDER_ERROR, payload: err.response.data })
        }
    };

    // Update Order
    const updateOrder = async (order) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

         try {
             const res = await axios.put(
                 '/api/v1/orders',
                 order,
                 config
             );
            dispatch({ type: UPDATE_ORDER, payload: res.data });
         } catch (err) {
             dispatch({ type: ORDER_ERROR, payload: err.response.data });
         }
    };

    // Filter Orders
    const filterOrdersByName = (text) => {
        dispatch({ type: FILTER_ORDERS_BY_NAME, payload: text });
    };

    const filterOrdersByStatus = (status) => {
        dispatch({ type: FILTER_ORDERS_BY_STATUS, payload: status });
    };

    const filterOrdersByType = (type) => {
        dispatch({ type: FILTER_ORDERS_BY_TYPE, payload: type });
    };

    // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    // Set Current Orders
    const setCurrent = (category) => {
        dispatch({ type: SET_CURRENT, payload: category });
    };

    // Clear Current Orders
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    return (
        <OrderContext.Provider
            value={{
                orders: state.orders,
                filtered: state.filtered,
                error: state.error,
                loading: state.loading,
                errorBool: state.errorBool,
                msg: state.msg,
                current: state.current,
                orderDetails: state.orderDetails,
                getOrders,
                clearFilter,
                filterOrdersByName,
                filterOrdersByStatus,
                filterOrdersByType,
                updateOrder,
                setCurrent,
                clearCurrent,
                getOneOrder
            }}
        >
            {props.children}
        </OrderContext.Provider>
    )
};

export default OrderState;