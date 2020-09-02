import React, {useContext, useEffect, useRef} from 'react';
import CustomerContext from "../../context/customers/customerContext";

const CustomerSearch = () => {
    const customerContext = useContext(CustomerContext);
    const text = useRef('');
    const { filterCustomers, clearFilter, filtered } = customerContext;

    useEffect(() => {
        if (filtered === null) {
            text.current.value = null;
        }
    });

    const onChange = (e) => {
        if (text.current.value !== '') {
            filterCustomers(e.target.value);
        } else {
            clearFilter();
        }
    };

    return (
        <div className="kt-portlet__body">
             {/*Search Form */}
            <div className="kt-form kt-form--label-right kt-margin-t-20 kt-margin-b-10">
                <div className="row align-items-center">
                    <div className="col-xl-8 order-2 order-xl-1">
                        <div className="row align-items-center">
                            <div className="col-md-4 kt-margin-b-20-tablet-and-mobile">
                                <div className="kt-input-icon kt-input-icon--left">
                                    <input ref={text} onChange={onChange} type="text" className="form-control" placeholder="Search..." id="generalSearch"/>
                                    <span className="kt-input-icon__icon kt-input-icon__icon--left">
                                        <span>
                                            <i className="la la-search"/>
                                        </span>
                                    </span>
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

export default CustomerSearch;