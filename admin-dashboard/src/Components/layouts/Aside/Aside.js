import React, { Fragment } from 'react';
import AsideLogo from "./AsideLogo";
import AsideMenu from "./AsideMenu";
import '../../../assets/css/skin/aside.css';
import '../../../assets/css/skin/brand.css';
import '../../../assets/css/skin/light.css';
import '../../../assets/css/skin/menu.css';

const Aside = () => {
    return (
        <Fragment>
            <button style={{ transform: 'translateX(-40px)' }} className="kt-aside-close " id="kt_aside_close_btn">
                <i className="la la-close"/>
            </button>
            <div className={style} style={styling} id="kt_aside">
                <AsideLogo />
                <AsideMenu />
            </div>
        </Fragment>
    );
};

const style = "kt-aside kt-aside--fixed kt-grid__item kt-grid kt-grid--desktop kt-grid--hor-desktop";

const styling = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};
export default Aside;