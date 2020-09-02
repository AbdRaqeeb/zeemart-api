import React, {useContext, useEffect, useRef} from 'react';
import ProductContext from "../../context/product/productContext";
import CategoryContext from "../../context/category/categoryContext";
const ProductSearch = () => {
    const categoryContext = useContext(CategoryContext);
    const productContext = useContext(ProductContext);
    const text = useRef('');
    const prod_cat = useRef('');

    const { filterProductName, filterProductCat, filtered, clearFilter } = productContext;
    const { getCategories, categories } = categoryContext;

    useEffect(() => {
        if (filtered === null) {
            text.current.value = null;
            prod_cat.current.value = null;
        }
    });

    useEffect(() => {
        getCategories();

        //eslint-disable-next-line
    }, []);

    const onChangeName = (e) => {
        if (text.current.value !== '') {
            filterProductName(e.target.value);
        } else {
            clearFilter();
        }
    };

    const onChangeCat = (e) => {
        if (prod_cat.current.value !== '') {
            filterProductCat(e.target.value);
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
                                    <input type="text" onChange={onChangeName} ref={text} className="form-control" placeholder="Search..." id="generalSearch" />
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
                                        <label>Category:</label>
                                    </div>
                                    <div className="kt-form__control">
                                        <select onChange={onChangeCat} ref={prod_cat} className="form-control bootstrap-select" id="kt_form_status">
                                            <option value="">All</option>
                                            {categories.map(category => (
                                                <option key={category.id} value={category.name}>{category.name}</option>
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

export default ProductSearch;