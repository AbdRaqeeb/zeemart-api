import React from 'react';
import logo from '../../../assets/media/logos/logo-4.png';

const AsideLogo = () => {
    return (
        <div className="kt-aside__brand kt-grid__item  " id="kt_aside_brand">
            <div className="kt-aside__brand-logo">
                <a href="/">
                    <img alt="Logo" src={logo}/>
                </a>
            </div>
        </div>
    );
};

export default AsideLogo;