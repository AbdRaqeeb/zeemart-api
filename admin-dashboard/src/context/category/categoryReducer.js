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
    CLEAR_ERRORS
} from '../types';

export default (state, action) => {
    switch (action.type) {
        case GET_CATEGORY:
            return {
                ...state,
                categories: action.payload,
                loading: false,
            };

        case ADD_CATEGORY:
            return {
                ...state,
                categories: [ action.payload.category, ...state.categories ],
                loading: false,
                msg: action.payload.msg
            };

        case UPDATE_CATEGORY:
            return {
                ...state,
                categories: state.categories.map((category) =>
                    category.id === action.payload.updatedCategory.id ? action.payload.updatedCategory : category
                ),
                loading: false,
                msg: action.payload.msg
            };

        case DELETE_CATEGORY:
            return {
                ...state,
                categories: state.categories.filter(
                    (category) => category.id !== action.payload
                ),
                loading: false,
                msg: 'Category deleted successfully'
            };

        case CLEAR_CATEGORY:
            return {
                ...state,
                categories: null,
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

        case FILTER_CATEGORY_TYPE:
        case FILTER_CATEGORY_NAME:
            return {
                ...state,
                filtered: state.categories.filter((category) => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return category.name.match(regex) || category.Type.name.match(regex);
                }),
            };

        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null,
            };

        case CATEGORY_ERROR:
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
};
