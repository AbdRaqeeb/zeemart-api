import React, {useContext, useEffect, useRef} from 'react';
import OrderContext from "../../context/orders/orderContext";


const OrderSearch = () => {
    const orderContext = useContext(OrderContext);
    const text = useRef('');
    const status = useRef('');
    const type = useRef('')
    const { filterOrdersByName, filterOrdersByType, filterOrdersByStatus, clearFilter, filtered } = orderContext;

    useEffect(() => {
        if (filtered === null) {
            text.current.value = null;
            status.current.value = null;
            type.current.value = null;
        }
    });

    const onChangeName = (e) => {
        if (text.current.value !== '' ) {
            filterOrdersByName(e.target.value);
        } else {
            clearFilter();
        }
    };

    const onChangeType = (e) => {
        if (type.current.value !== '' ) {
            filterOrdersByType(e.target.value);
        } else {
            clearFilter();
        }
    };

    const onChangeStatus = (e) => {
        if (status.current.value !== '' ) {
            filterOrdersByStatus(e.target.value);
        } else {
            clearFilter();
        }
    };

    return (
        <div className="kt-portlet__body">
            {/*begin: Search Form*/}
            <div className="kt-form kt-form--label-right kt-margin-t-20 kt-margin-b-10">
                <div className="row align-items-center">
                    <div className="col-xl-8 order-2 order-xl-1">
                        <div className="row align-items-center">
                            <div className="col-md-4 kt-margin-b-20-tablet-and-mobile">
                                <div className="kt-input-icon kt-input-icon--left">
                                    <input ref={text} onChange={onChangeName} type="text" className="form-control" placeholder="Search..." id="generalSearch" />
                                    <span className="kt-input-icon__icon kt-input-icon__icon--left">
                                        <span>
                                            <i className="la la-search"/>
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-4 kt-margin-b-20-tablet-and-mobile">
                                <div className="kt-form__group kt-form__group--inline">
                                    <div className="kt-form__label">
                                        <label>Status:</label>
                                    </div>
                                    <div className="kt-form__control">
                                        <select ref={status} onChange={onChangeStatus} className="form-control bootstrap-select" id="kt_form_status">
                                            <option value="">All</option>
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="canceled">Canceled</option>
                                            <option value="successful">Successful</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 kt-margin-b-20-tablet-and-mobile">
                                <div className="kt-form__group kt-form__group--inline">
                                    <div className="kt-form__label">
                                        <label>Payment:</label>
                                    </div>
                                    <div className="kt-form__control">
                                        <select ref={type} onChange={onChangeType} className="form-control bootstrap-select" id="kt_form_type">
                                            <option value="">All</option>
                                            <option value="cash">Cash on delivery</option>
                                            <option value="transfer">Transfer</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/*end: Search Form */}
        </div>
    );
};

export default OrderSearch;