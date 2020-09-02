import React from 'react';

const CustomersHeader = () => {
    return (
        <div className="kt-portlet__head kt-portlet__head--lg">
            <div className="kt-portlet__head-label">
                <span className="kt-portlet__head-icon">
                    <i className="kt-font-brand flaticon2-line-chart"/>
                </span>
                <h3 className="kt-portlet__head-title">
                    Customers
                    <small>Registered users</small>
                </h3>
            </div>
        </div>
    );
};

export default CustomersHeader;