import React from 'react';


const HeaderMobile = () => {
    return (
        <div id="kt_header_mobile" className="kt-header-mobile  kt-header-mobile--fixed ">
            <div className="kt-header-mobile__logo">
                <img alt="Logo" src="https://res.cloudinary.com/dho9flazo/image/upload/v1599595460/dashboard/logos/log_dbqs6k.png" width="30px" height="50px" />
            </div>
            <div className="kt-header-mobile__toolbar">
                <button className="kt-header-mobile__toggler kt-header-mobile__toggler--left"
                        id="kt_aside_mobile_toggler"><span></span></button>
                <button className="kt-header-mobile__topbar-toggler" id="kt_header_mobile_topbar_toggler"><i
                    className="flaticon-more"></i></button>
            </div>
        </div>
    );
};

export default HeaderMobile;