import React, {useReducer} from 'react';
import axios from 'axios';
import TypeContext from './typeContext';
import typeReducer from "./typeReducer";
import {
    GET_TYPE,
    ADD_TYPE,
    TYPE_ERROR,
    DELETE_TYPE,
    FILTER_TYPE,
    UPDATE_TYPE,
    SET_CURRENT,
    CLEAR_CURRENT,
    CLEAR_FILTER,
    CLEAR_ERRORS,
    CLEAR_MSG
} from '../types';


const TypeState = (props) => {
    const initialState = {
        types: [],
        error: null,
        loading: true,
        current: null,
        errorBool: null,
        msg: null,
        filtered: null
    };
    const [state, dispatch] = useReducer(typeReducer, initialState);

    // Get Categories
    const getTypes = async () => {
        try {
            const res = await axios.get('/api/v1/types');

            await dispatch({
                type: GET_TYPE,
                payload: res.data.types
            });
        } catch (err) {
            await dispatch({ type: TYPE_ERROR, payload: err.response.data });
        }
    };

    // Add Type
    const addType = async (type) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.post('/api/v1/types', type, config);

            dispatch({ type: ADD_TYPE, payload: res.data });
        } catch (err) {
            console.log(err.response.data);
            dispatch({ type: TYPE_ERROR, payload: err.response.data });
        }
    };

    // Delete type
    const deleteType = async (id) => {
        try {
            await axios.delete(`/api/v1/types/${id}`);

            dispatch({ type: DELETE_TYPE, payload: id });
        } catch (err) {
            dispatch({ type: TYPE_ERROR, payload: err.response.data });
        }
    };

    // Update Type
    const updateType = async (type) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const res = await axios.put(
                '/api/v1/types',
                type,
                config
            );
            dispatch({ type: UPDATE_TYPE, payload: res.data });
        } catch (err) {
            console.log(err.response);
            dispatch({ type: TYPE_ERROR, payload: err.response.data });
        }
    };

    // Set Current Type
    const setCurrent = (type) => {
        dispatch({ type: SET_CURRENT, payload: type });
    };

    // Clear Current Type
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    // Filter Type
    const filterType = (text) => {
        dispatch({ type: FILTER_TYPE, payload: text });
    };


    // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    // Clear errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

    // Clear Msg
    const clearMsg = () => dispatch({ type: CLEAR_MSG });

    return (
        <TypeContext.Provider
            value={{
                types: state.types,
                error: state.error,
                loading: state.loading,
                errorBool: state.errorBool,
                msg: state.msg,
                current: state.current,
                filtered: state.filtered,
                getTypes,
                addType,
                updateType,
                deleteType,
                filterType,
                clearFilter,
                clearCurrent,
                setCurrent,
                clearErrors,
                clearMsg
            }}
        >
            {props.children}
        </TypeContext.Provider>
    )
};

export default TypeState;