import React, {useContext, useEffect, useState, Fragment} from 'react';
import Spinner from "../layouts/Spinner";
import ProductContext from '../../context/product/productContext';
import {useSnackbar} from 'react-simple-snackbar';
import { addComma } from '../../utils/formatNumber';

const ProductTable = ({products, filtered, categories}) => {
    const productContext = useContext(ProductContext);
    const {current, setCurrent, clearCurrent, loading, error, updateProduct, deleteProduct, addProduct, clearErrors, msg} = productContext;

    const [openSnackbar] = useSnackbar();

    const [waiting, setWaiting] = useState(false);

    const [product, setProduct] = useState({
        name: '',
        description: '',
        unit: '',
        price: '',
        sale_price: '',
        quantity: 0,
        discount: 0,
        image: '',
        category_id: ''
    });

    useEffect(() => {
        if (current !== null) {
            setProduct({
                name: current.name,
                description: current.description,
                unit: current.unit,
                price: current.price,
                sale_price: current.sale_price,
                quantity: current.quantity,
                discount: current.discount,
                category_id: current.category_id
            });
        } else {
            setProduct({
                name: '',
                description: '',
                unit: '',
                price: '',
                sale_price: '',
                quantity: '',
                discount: '',
                image: '',
                category_id: ''
            });
        }

        if (error) {
            openSnackbar(error);
            clearErrors();
        }

        if (msg) {
            openSnackbar(msg);
            clearErrors();
        }

        //eslint-disable-next-line
    }, [productContext, current, msg, error]);


    const {name, description, unit, price, sale_price, quantity, discount, category_id} = product;

    const onImageChange = e => setProduct({...product, image: e.target.files[0]});

    const onChange = e => setProduct({...product, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        if (current !== null) {
            const formData = new FormData();
            //eslint-disable-next-line
            {
                product.image && formData.append('image', product.image)
            }
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('sale_price', sale_price);
            formData.append('discount', discount);
            formData.append('quantity', quantity);
            formData.append('unit', unit);
            formData.append('category_id', category_id);
            updateProduct(formData, current.id);
            setProduct({
                name: '',
                description: '',
                unit: '',
                price: '',
                sale_price: '',
                quantity: '',
                discount: '',
                image: '',
                category: ''
            });
            clearAll();
            setWaiting(false)
        } else {
            const formData = new FormData();
            formData.append('image', product.image);
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('sale_price', sale_price);
            formData.append('discount', discount);
            formData.append('quantity', quantity);
            formData.append('unit', unit);
            formData.append('category_id', category_id);
            addProduct(formData);
            setProduct({
                name: '',
                description: '',
                unit: '',
                price: '',
                sale_price: '',
                quantity: '',
                discount: '',
                image: '',
                category: ''
            });
            clearAll();
            setWaiting(false)
        }
    };

    const clearAll = () => clearCurrent();

    const onDelete = (id) => {
        deleteProduct(id);
        clearCurrent();
    };


    if (products !== null && products.length === 0 && !loading) {
        return <h4>Please add a product</h4>
    }

    if (loading) return <Spinner/>;

    return (
        <Fragment>
            <div className="kt-portlet__head-toolbar" style={{ marginBottom: "20px" }}>
                <div className="kt-portlet__head-wrapper">
                    <div className="kt-portlet__head-actions">
                        <a href onClick={() => setWaiting(true)} className="btn btn-brand btn-elevate btn-icon-sm">
                            <i className="la la-plus" />
                            Add Product
                        </a>
                    </div>
                </div>
            </div>
            <div className="cartsy-products-block cartsy-block-spacing-wrapper" id="cartsy-product-block">
                <div
                    className="cartsy-product-search-results grid-cols-xxl-6 grid-cols-xl-5 grid-cols-md-4 grid-cols-sm-3 grid-cols-2 gap-10">
                    {filtered !== null ? filtered.map(product => (
                        <div className="cartsy-helium-product-card product cartsy-product type-product" key={product.id}>
                            <div className="cartsy-helium-product-card-thumb">
                                <a href style={{ cursor: "pointer" }} onClick={() => { setCurrent(product); setWaiting(true) }} className="">
                                    <img className="cartsy-lazy-image lazyloaded" src={product.image} alt=""/>
                                </a>
                            </div>
                            <div className=" cartsy-helium-product-card-description">
                                <div className="cartsy-helium-product-card-price">
                            <span className="price">
                                <span className="woocommerce-Price-amount amount">
                                    <span className="woocommerce-Price-currencySymbol">
                                        N
                                    </span> {' '}
                                    {addComma(product.price)}
                                </span>
                            </span>
                                    <span className="unit">
                            {product.unit}
                            </span>
                                </div>
                                <a href style={{ cursor: "pointer" }} onClick={() => { setCurrent(product); setWaiting(true) }}
                                   className="cartsy-helium-product-card-title">{product.name}</a>
                            </div>
                        </div>
                    )) : products.map(product => (
                        <div className="cartsy-helium-product-card product cartsy-product type-product" key={product.id}>
                            <div className="cartsy-helium-product-card-thumb">
                                <a href style={{ cursor: "pointer" }} onClick={() => { setCurrent(product); setWaiting(true) }} className="">
                                    <img className="cartsy-lazy-image lazyloaded" src={product.image} alt=""/>
                                </a>
                            </div>
                            <div className=" cartsy-helium-product-card-description">
                                <div className="cartsy-helium-product-card-price">
                            <span className="price">
                                <span className="woocommerce-Price-amount amount">
                                    <span className="woocommerce-Price-currencySymbol">
                                        N
                                    </span> {' '}
                                    {addComma(product.price)}
                                </span>
                            </span>
                                    <span className="unit">
                            {product.unit}
                            </span>
                                </div>
                                <a href style={{ cursor: "pointer" }} onClick={() => { setCurrent(product); setWaiting(true) }}
                                   className="cartsy-helium-product-card-title">{product.name}</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="kt-portlet show_product_form" style={waiting ? updateStyle: null}>
                <div className="kt-portlet__head">
                    <div className="kt-portlet__head-label">
                        <h3 className="kt-portlet__head-title">
                            {current ? "Update Product" : "Add Product"}
                        </h3>
                    </div>
                    {current !== null && <button className="btn btn-danger" onClick={() => {onDelete(current.id); setWaiting(false)}} type="submit" style={{ float: "left" }}>Delete</button>}
                </div>
                <form className="kt-form" onSubmit={onSubmit}>
                    <div className="kt-portlet__body">
                        <div className="kt-section">
                            <div className="form-group row">
                                <label className="col-xl-3 col-lg-3 col-form-label">Image</label>
                                <div className="col-lg-9 col-xl-6">
                                    <div className="kt-avatar kt-avatar--outline kt-avatar--circle" id="kt_apps_user_add_avatar">
                                        <input type="file" name="image" onChange={onImageChange} accept=".png, .jpg, .jpeg"/>
                                    </div>
                                </div>
                                {current && <img src={current.image} width="80px" height="80px" alt=""/>}
                            </div>
                            <div className="form-group" style={{width: "50%", margin: "auto"}}>
                                <label>Name: *</label>
                                <input type="text" name="name" onChange={onChange} value={name} className="form-control" />
                                <span className="form-text text-muted">Please enter product name </span>
                            </div>
                            <div className="form-group" style={{width: "50%", margin: "auto"}}>
                                <label>Description: </label>
                                <input name="description" value={description} onChange={onChange} type="text" className="form-control" />
                                <span className="form-text text-muted">Please enter product description </span>
                            </div>
                            <div className="form-group" style={{width: "50%", margin: "auto"}}>
                                <label>Unit: *</label>
                                <input type="text" onChange={onChange} value={unit} name="unit" className="form-control" />
                                <span className="form-text text-muted">Please enter product unit </span>
                            </div>
                            <div className="form-group" style={{width: "50%", margin: "auto"}}>
                                <label>Price: *</label>
                                <input type="number" name="price" value={price} onChange={onChange} className="form-control" />
                                <span className="form-text text-muted">Please enter product price || <span className="kt-font-danger">Integer only</span> </span>
                            </div>
                            <div className="form-group" style={{width: "50%", margin: "auto"}}>
                                <label>Sale price: *</label>
                                <input type="number" name="sale_price" onChange={onChange} value={sale_price} className="form-control" />
                                <span className="form-text text-muted">Please enter product sale price || <span className="kt-font-danger">Integer only</span></span>
                            </div>
                            <div className="form-group" style={{width: "50%", margin: "auto"}}>
                                <label>Quantity: *</label>
                                <input type="number" value={quantity} onChange={onChange} name="quantity" className="form-control" />
                                <span className="form-text text-muted">Please enter quantity </span>
                            </div>
                            <div className="form-group" style={{width: "50%", margin: "auto"}}>
                                <label>Discount: *</label>
                                <input type="number" onChange={onChange} value={discount} name="discount" className="form-control"/>
                                <span className="form-text text-muted">Please enter discount </span>
                            </div>
                            <div className="col-md-4 kt-margin-b-20-tablet-and-mobile" style={{ marginTop: "60px", margin: "auto", width: "50%" }}>
                                <div className="kt-form__group kt-form__group--inline">
                                    <div className="kt-form__label">
                                        <label>Category:</label>
                                    </div>
                                    <div className="kt-form__control">
                                        <select onChange={onChange} name="category_id" className="form-control bootstrap-select" id="kt_form_status">
                                            <option value="">All</option>
                                            {categories.map(category => (
                                                <option value={category.id} key={category.id}>{category.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="kt-portlet__foot">
                        <div className="kt-form__actions">
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <button onClick={() => setWaiting(false)} type="reset" className="btn btn-secondary">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </Fragment>
    );
};

const updateStyle = {
    display: "block"
};


export default ProductTable;