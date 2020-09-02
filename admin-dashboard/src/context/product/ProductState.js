import React, {useReducer} from "react";
import axios from 'axios';
import ProductContext from './productContext';
import productReducer from './productReducer';
import {
    ADD_PRODUCT,
    GET_PRODUCTS,
    PRODUCT_ERROR,
    CLEAR_PRODUCTS,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    FILTER_PRODUCT_NAME,
    FILTER_PRODUCT_CATEGORY,
    CLEAR_CURRENT,
    SET_CURRENT,
    CLEAR_FILTER,
    CLEAR_ERRORS,
} from '../types';


const ProductState = (props) => {
    const initialState = {
        products: [],
        current: null,
        filtered: null,
        error: null,
        loading: true,
        msg: null,
        errorBool: null
    };

    const [state, dispatch] = useReducer(productReducer, initialState);

    // Get products
    const getProducts = async () => {
      try {
            const res = await axios.get('/api/v1/products');

            dispatch({
                type: GET_PRODUCTS,
                payload: res.data.products,
            });
      }  catch (e) {
            dispatch({ type: PRODUCT_ERROR, payload: e.response.data });
      }
    };

    // Add product

    const addProduct = async (formData) => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        try {
            const res = await axios.post('/api/v1/products', formData, config);

            dispatch({ type: ADD_PRODUCT, payload: res.data });
        } catch (err) {
            dispatch({ type: PRODUCT_ERROR, payload: err.response.data });
        }
    };

    // Delete product
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`/api/v1/products/${id}`);

            dispatch({ type: DELETE_PRODUCT, payload: id });
        } catch (err) {
            dispatch({ type: PRODUCT_ERROR, payload: err.response.data });
        }
    };

    // Update Categories
    const updateProduct = async (formData, id) => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        try {
            const res = await axios.put(
                `/api/v1/products/${id}`,
                formData,
                config
            );
            console.log("DATA: ", res.data);
            dispatch({ type: UPDATE_PRODUCT, payload: res.data });
        } catch (err) {
            console.log(err.response);
            dispatch({ type: PRODUCT_ERROR, payload: err.response.data });
        }
    };

    // Clear Products
    const clearProducts = () => {
        dispatch({ type: CLEAR_PRODUCTS });
    };

    // Set Current Products
    const setCurrent = (product) => {
        dispatch({ type: SET_CURRENT, payload: product });
    };

    // Clear Current Products
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    // Filter products
    const filterProductName = (text) => {
        dispatch({ type: FILTER_PRODUCT_NAME, payload: text });
    };

    // Filter products
    const filterProductCat = (prod_cat) => {
        dispatch({ type: FILTER_PRODUCT_CATEGORY, payload: prod_cat });
    };

    // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    // Clear errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
    return (
        <ProductContext.Provider
            value={{
                products: state.products,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                loading: state.loading,
                msg: state.msg,
                errorBool: state.errorBool,
                getProducts,
                addProduct,
                updateProduct,
                deleteProduct,
                clearCurrent,
                clearFilter,
                clearProducts,
                filterProductName,
                filterProductCat,
                setCurrent,
                clearErrors
            }}
        >
            {props.children}
        </ProductContext.Provider>
    );
};

export default ProductState;