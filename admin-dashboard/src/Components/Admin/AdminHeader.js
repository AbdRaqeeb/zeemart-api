import React from 'react';

const AdminHeader = () => {
    return (
        <div className="kt-portlet__head kt-portlet__head--lg">
            <div className="kt-portlet__head-label">
                <span className="kt-portlet__head-icon">
                    <i className="kt-font-brand flaticon2-user" />
                </span>
                <h3 className="kt-portlet__head-title">
                    Admins
                    <small>List of admins handling the dashboard</small>
                </h3>
            </div>
        </div>
    );
};

export default AdminHeader;