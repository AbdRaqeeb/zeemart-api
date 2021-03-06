import React from 'react';

const CategoryHeader = () => {
    return (
        <div className="kt-portlet__head kt-portlet__head--lg">
            <div className="kt-portlet__head-label">
                <span className="kt-portlet__head-icon">
                    <i className="kt-font-brand flaticon2-graph" />
                </span>
                <h3 className="kt-portlet__head-title">
                    Category
                    <small>Categories for the products</small>
                </h3>
            </div>
        </div>
    );
};

export default CategoryHeader;