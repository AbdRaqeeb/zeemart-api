import React from 'react';
import Aside from "../layouts/Aside/Aside";
import Main from "../layouts/Main/Main";
import HeaderMobile from "../layouts/HeaderMobile";

const Home = () => {
    return (
            <div className={body}>
                <HeaderMobile />
                <div className={container}>
                    <div className={wrapper}>
                        <Aside />
                        <Main />
                    </div>
                </div>
            </div>
    );
};

const wrapper = "kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page";
const body = "kt-quick-panel--right kt-demo-panel--right kt-offcanvas-panel--right kt-header--fixed kt-header-mobile--fixed kt-subheader--fixed kt-subheader--enabled kt-subheader--solid kt-aside--enabled kt-aside--fixed kt-page--loading";
const container = "kt-grid kt-grid--hor kt-grid--root";

export default Home;