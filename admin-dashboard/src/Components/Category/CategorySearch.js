import React, {useContext, useEffect, useRef} from 'react';
import CategoryContext from "../../context/category/categoryContext";
import TypeContext from "../../context/type/typeContext";

const CategorySearch = () => {
    const categoryContext = useContext(CategoryContext);
    const typeContext = useContext(TypeContext);

    const text = useRef('');
    const cat_type = useRef('');

    const { getTypes, types, } = typeContext;
    const { filterName, filterType, clearFilter, filtered } = categoryContext;

    useEffect(() => {
        if (filtered === null) {
            text.current.value = null;
            cat_type.current.value = null;
        }
    });

    useEffect(() => {
       getTypes();

       //eslint-disable-next-line
    }, []);

    const onChangeName = (e) => {
        if (text.current.value !== '') {
            filterName(e.target.value);
        } else {
            clearFilter();
        }
    };

    const onChangeType = (e) => {
        if (cat_type.current.value !== '') {
            filterType(e.target.value);
        } else {
            clearFilter();
        }
    };

    return (
        <div className="kt-portlet__body">
            {/*begin: Search Form*/}
            <div className="kt-form kt-form--label-right kt-margin-t-20 kt-margin-b-10">
                <div className="row align-items-center">
                    <div className="col-xl-8 order-2 order-xl-1">
                        <div className="row align-items-center">
                            <div className="col-md-4 kt-margin-b-20-tablet-and-mobile">
                                <div className="kt-input-icon kt-input-icon--left">
                                    <input ref={text} onChange={onChangeName} type="text" className="form-control" placeholder="Search..." />
                                    <span className="kt-input-icon__icon kt-input-icon__icon--left">
                                        <span>
                                            <i className="la la-search" />
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-4 kt-margin-b-20-tablet-and-mobile">
                                <div className="kt-form__group kt-form__group--inline">
                                    <div className="kt-form__label">
                                        <label>Type:</label>
                                    </div>
                                    <div className="kt-form__control">
                                        <select ref={cat_type} onChange={onChangeType} className="form-control bootstrap-select" id="kt_form_status">
                                            <option value="">All</option>
                                            {types.map(type => (
                                                <option key={type.id} value={type.name}>{type.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*end: Search Form -->*/}
        </div>
    );
};

export default CategorySearch;