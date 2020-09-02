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

export default (state, action) => {
    switch (action.type) {
        case GET_TYPE:
            return {
                ...state,
                types: action.payload,
                loading: false,
            };

        case ADD_TYPE:
            return {
                ...state,
                msg: action.payload.msg,
                types: [ action.payload.type, ...state.types ],
                loading: false,
            };

        case TYPE_ERROR:
            return {
                ...state,
                errorBool: action.payload.error,
                msg: action.payload.msg,
                error: action.payload
            };

        case UPDATE_TYPE:
            return {
                ...state,
                types: state.types.map((type) =>
                    type.id === action.payload.updatedType.id ? action.payload.updatedType : type
                ),
                msg: action.payload.msg,
                loading: false,
            };

        case DELETE_TYPE:
            return {
                ...state,
                types: state.types.filter(
                    (type) => type.id !== action.payload
                ),
                loading: false,
                msg: 'Type deleted successfully'
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

        case FILTER_TYPE:
            return {
                ...state,
                filtered: state.types.filter((type) => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return type.name.match(regex);
                }),
            };

        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null,
            };

        case CLEAR_MSG:
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
                msg: null
            };


        default:
            return state;
    }
};
