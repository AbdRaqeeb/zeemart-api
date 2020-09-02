import React from 'react';

const Action = () => {
    return (
        <div className="kt-subheader   kt-grid__item" id="kt_subheader">
            <div className="kt-subheader__main">
                <h3 className="kt-subheader__title">Dashboard</h3>
                <span className="kt-subheader__separator kt-subheader__separator--v"></span>
                <span className="kt-subheader__desc">Zee mart</span>
                <div className="kt-input-icon kt-input-icon--right kt-subheader__search kt-hidden">
                    <input type="text" className="form-control" placeholder="Search order..." id="generalSearch"/>
                        <span className="kt-input-icon__icon kt-input-icon__icon--right">
                            <span>
                                <i className="flaticon2-search-1"/>
                            </span>
                        </span>
                </div>
            </div>
        </div>
    );
};

export default Action;