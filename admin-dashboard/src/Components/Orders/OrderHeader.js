import React from 'react';

const OrderHeader = () => {
    return (
        <div className="kt-portlet__head kt-portlet__head--lg">
            <div className="kt-portlet__head-label">
                <span className="kt-portlet__head-icon">
                    <i className="kt-font-brand flaticon2-line-chart"></i>
                </span>
                <h3 className="kt-portlet__head-title">
                    Orders
                    <small>Orders made by customers</small>
                </h3>
            </div>
        </div>
    );
};

export default OrderHeader;