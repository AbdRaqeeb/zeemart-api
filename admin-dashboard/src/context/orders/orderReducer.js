import {
    GET_ORDERS,
    ORDER_ERROR,
    UPDATE_ORDER,
    CLEAR_FILTER,
    FILTER_ORDERS_BY_NAME,
    FILTER_ORDERS_BY_STATUS,
    FILTER_ORDERS_BY_TYPE,
    SET_CURRENT,
    CLEAR_CURRENT,
    GET_ORDER
} from '../types';


export default (state, action) => {
    switch (action.type) {
        case GET_ORDERS:
            return {
                ...state,
                orders: action.payload,
                loading: false,
            };

        case GET_ORDER:
            return {
                ...state,
                orderDetails: action.payload.OrderDetails,
                loading: false
            };

        case UPDATE_ORDER:
            return {
                ...state,
                 orders: state.orders.map(order =>
                     order.order_id === action.payload.updatedOrder.order_id ? action.payload.updatedOrder : order
                 ),
                msg: action.payload.msg,
                loading: false,
            };

        case FILTER_ORDERS_BY_TYPE:
        case FILTER_ORDERS_BY_STATUS:
        case FILTER_ORDERS_BY_NAME:
            return {
                ...state,
                filtered: state.orders.filter((order) => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return order.User.firstname.match(regex) || order.User.lastname.match(regex) || order.type.match(regex) || order.status.match(regex);
                }),
            };

        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null,
            };

        case ORDER_ERROR:
            return {
                ...state,
                error: action.payload,
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
                msg: null
            };

        default:
            return state;
    }
};
