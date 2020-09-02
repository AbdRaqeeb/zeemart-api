import {
    GET_CUSTOMERS,
    FILTER_CUSTOMERS,
    CLEAR_FILTER,
    CUSTOMER_ERROR,
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_CUSTOMERS:
            return {
                ...state,
                customers: action.payload,
                loading: false,
            };


        case FILTER_CUSTOMERS:
            return {
                ...state,
                filtered: state.customers.filter((customer) => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return customer.firstname.match(regex) || customer.lastname.match(regex);
                }),
            };

        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null,
            };

        case CUSTOMER_ERROR:
            return {
                ...state,
                error: action.payload,
            };

        default:
            return state;
    }
};
