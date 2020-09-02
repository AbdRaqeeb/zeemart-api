import {
    ADMIN_ERROR,
    GET_ADMINS,
    ADD_ADMIN,
    UPDATE_ADMIN_STATUS,
    CLEAR_ADMINS,
    SET_CURRENT,
    CLEAR_CURRENT,
    FILTER_ADMIN,
    CLEAR_FILTER,
    DELETE_ADMIN,
    CLEAR_ERRORS
} from '../types';


export default (state, action) => {
    switch (action.type) {
        case GET_ADMINS:
            return {
                ...state,
                admins: action.payload,
                loading: false,
            };

        case ADD_ADMIN:
            console.log('DATA', action.payload);
            return {
                ...state,
                admins: [ action.payload.admin, ...state.admins ],
                loading: false,
                msg: action.payload.msg
            };

        case UPDATE_ADMIN_STATUS:
            console.log('UPDATE: ', action.payload);
            return {
                ...state,
                admins: state.admins.map((admin) =>
                    admin.admin_id === action.payload.updatedAdmin.admin_id ? action.payload.updatedAdmin : admin
                ),
                msg: action.payload.msg,
                loading: false,
            };


        case CLEAR_ADMINS:
            return {
                ...state,
                admins: null,
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

        case FILTER_ADMIN:
            return {
                ...state,
                filtered: state.admins.filter((admin) => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return admin.firstname.match(regex) || admin.lastname.match(regex);
                }),
            };

        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null,
            };

        case ADMIN_ERROR:
            return {
                ...state,
                error: action.payload,
            };

        case DELETE_ADMIN:
            return {
                ...state,
                admins: state.admins.filter(
                    (admin) => admin.admin_id !== action.payload
                ),
                loading: false,
                msg: 'Admin deleted successfully'
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
                msg: null,
                errorBool: null
            };

        default:
            return state;
    }
};
