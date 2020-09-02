import React from 'react';

const TypeHeader = () => {
    return (
        <div className="kt-portlet__head kt-portlet__head--lg">
            <div className="kt-portlet__head-label">
                <span className="kt-portlet__head-icon">
                    <i className="kt-font-brand flaticon2-menu"/>
                </span>
                <h3 className="kt-portlet__head-title">
                    Types
                    <small>List of types available</small>
                </h3>
            </div>
        </div>
    );
};

export default TypeHeader;