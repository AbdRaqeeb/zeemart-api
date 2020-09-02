import React, {useReducer} from 'react';
import axios from 'axios';
import CategoryContext from './categoryContext';
import categoryReducer from "./categoryReducer";
import {
    ADD_CATEGORY,
    GET_CATEGORY,
    UPDATE_CATEGORY,
    DELETE_CATEGORY,
    CATEGORY_ERROR,
    FILTER_CATEGORY_NAME,
    FILTER_CATEGORY_TYPE,
    CLEAR_CATEGORY,
    SET_CURRENT,
    CLEAR_CURRENT,
    CLEAR_FILTER,
    CLEAR_ERRORS,
} from '../types';

const CategoryState = (props) => {
    const initialState = {
        categories: [],
        current: null,
        filtered: null,
        error: null,
        loading: true,
        errorBool: null,
        msg: null
    };
    const [state, dispatch] = useReducer(categoryReducer, initialState);

    // Get Categories
    const getCategories = async () => {
        try {
            const res = await axios.get('/api/v1/categories');

           await dispatch({
                type: GET_CATEGORY,
                payload: res.data.categories
            });
        } catch (err) {
            await dispatch({ type: CATEGORY_ERROR, payload: err.response.data });
        }
    };

    // Add category
    const addCategory = async (category) => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        try {
            const res = await axios.post('/api/v1/categories', category, config);
            dispatch({ type: ADD_CATEGORY, payload: res.data });
            console.log('DATA: ', res.data)
        } catch (err) {
            console.log(err.response);
            dispatch({ type: CATEGORY_ERROR, payload: err.response.data });
        }
    };

    // Delete category
    const deleteCategory = async (id) => {
        try {
            await axios.delete(`/api/v1/categories/${id}`);

            dispatch({ type: DELETE_CATEGORY, payload: id });
        } catch (err) {
            console.log(err.response);
            dispatch({ type: CATEGORY_ERROR, payload: err.response.data });
        }
    };

    // Update Categories
    const updateCategory = async (formData, id) => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        try {
            const res = await axios.put(
                `/api/v1/categories/${id}`,
                formData,
                config
            );
            dispatch({ type: UPDATE_CATEGORY, payload: res.data });
        } catch (err) {
            dispatch({ type: CATEGORY_ERROR, payload: err.response.data });
        }
    };

    // Clear Categories
    const clearCategories = () => {
        dispatch({ type: CLEAR_CATEGORY });
    };

    // Set Current Categories
    const setCurrent = (category) => {
        dispatch({ type: SET_CURRENT, payload: category });
    };

    // Clear Current Categories
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    // Filter Categories by name
    const filterName = (text) => {
        dispatch({ type: FILTER_CATEGORY_NAME, payload: text });
    };

    // Filter Categories by type
    const filterType = (cat_type) => {
        dispatch({ type: FILTER_CATEGORY_TYPE, payload: cat_type });
    };


    // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    // Clear errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

    return (
        <CategoryContext.Provider
            value={{
                categories: state.categories,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                loading: state.loading,
                errorBool: state.errorBool,
                msg: state.msg,
                getCategories,
                addCategory,
                updateCategory,
                deleteCategory,
                clearCategories,
                clearCurrent,
                clearFilter,
                setCurrent,
                filterName,
                filterType,
                clearErrors
            }}
        >
            {props.children}
        </CategoryContext.Provider>
    )
};

export default CategoryState;