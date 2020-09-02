import React from 'react';
import 'jquery';
import 'popper.js';
import 'bootstrap';

import Navbar from "./Navbar/Navbar";
import Action from "./Action/Action";
import Content from "./Content/Content";


const Main = () => {

    return (
        <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper" id="kt_wrapper">
            <Navbar />
            <Action />
            <Content/>
        </div>
    );
};

export default Main;