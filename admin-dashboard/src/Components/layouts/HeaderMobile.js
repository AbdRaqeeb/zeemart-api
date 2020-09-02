import React from 'react';
import logo from '../../assets/media/logos/logo-light.png';

const HeaderMobile = () => {
    return (
        <div id="kt_header_mobile" className="kt-header-mobile  kt-header-mobile--fixed ">
            <div className="kt-header-mobile__logo">
                <img alt="Logo" src={logo}/>
            </div>
            <div className="kt-header-mobile__toolbar">
                <button className="kt-header-mobile__toggler kt-header-mobile__toggler--left"
                        id="kt_aside_mobile_toggler"><span></span></button>
                <button className="kt-header-mobile__toggler" id="kt_header_mobile_toggler"><span></span></button>
                <button className="kt-header-mobile__topbar-toggler" id="kt_header_mobile_topbar_toggler"><i
                    className="flaticon-more"></i></button>
            </div>
        </div>
    );
};

export default HeaderMobile;