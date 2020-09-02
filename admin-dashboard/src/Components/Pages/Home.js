import React from 'react';
import Aside from "../layouts/Aside/Aside";
import Main from "../layouts/Main/Main";

const Home = () => {
    return (
        <div className={wrapper}>
            <Aside />
            <Main />
        </div>
    );
};

const wrapper = "kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page";

export default Home;