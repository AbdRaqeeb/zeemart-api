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
    CLEAR_ERRORS
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false
            };


        case ADD_PRODUCT:
            return {
                ...state,
                products: [ action.payload.product, ...state.products ],
                loading: false,
                msg: action.payload.msg
            };

        case UPDATE_PRODUCT:
            return {
                ...state,
                products: state.products.map((product) =>
                    product.id === action.payload.updatedProduct.id ? action.payload.updatedProduct : product
                ),
                loading: false,
                msg: action.payload.msg
            };

        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(
                    (product) => product.id !== action.payload
                ),
                loading: false,
                msg: 'Product deleted successfully'
            };

        case CLEAR_PRODUCTS:
            return {
                ...state,
                products: null,
                filtered: null,
                error: null,
                current: null
            };

        case SET_CURRENT:
            return {
                ...state,
                current: action.payload,
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null,
            };


        case FILTER_PRODUCT_CATEGORY:
        case FILTER_PRODUCT_NAME:
            return {
                ...state,
                filtered: state.products.filter((product) => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return product.name.match(regex) || product.Category.name.match(regex);
                }),
            };

        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null,
            };

        case PRODUCT_ERROR:
            return {
                ...state,
                error: action.payload,
                errorBool: action.payload.error,
                msg: action.payload.msg
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
                msg: null
            };

        default:
            return state;
    }
}