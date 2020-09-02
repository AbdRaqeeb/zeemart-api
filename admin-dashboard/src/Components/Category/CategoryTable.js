import React, {useContext, useEffect, useState} from 'react';
import CategoryContext from "../../context/category/categoryContext";
import Spinner from "../layouts/Spinner";
import {useSnackbar} from 'react-simple-snackbar';


const CategoryTable = ({ categories, filtered, types }) => {
    const categoryContext = useContext(CategoryContext);


    const { loading, deleteCategory, clearCurrent, setCurrent, updateCategory, current, addCategory, error, msg, clearErrors } = categoryContext;

    const [waiting, setWaiting] = useState(false);

    const [category, setCategory] = useState({
        name: '',
        image: '',
        type: '',
        id: ''
    });

    const [openSnackbar] = useSnackbar();

    const {name} = category;

    useEffect(() => {
        if (current !== null) {
            setCategory({
                name: current.name,
                type: current.type_id,
                id: current.id
            });
        } else {
            setCategory({
                name: '',
                image: '',
                type: '',
                id: ''
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
    }, [categoryContext, current, error, msg]);

    const onImageChange = (e) => setCategory({ ...category, image: e.target.files[0]});

    const onChange = (e) => setCategory({...category, [e.target.name]: e.target.value});


    const onSubmit = (e) => {
        e.preventDefault();
            if (current !== null) {
                setCategory({
                    ...category,
                    id: current.id
                });
                const formData = new FormData();
                //eslint-disable-next-line
                {
                    category.image && formData.append('image', category.image)
                }
                formData.append('name', name);
                formData.append('type', category.type);
                updateCategory(formData, category.id);
                clearAll();
                setCategory({
                    name: '',
                    image: '',
                    type: '',
                    id: ''
                });
                setWaiting(false)
            } else {
                const formData = new FormData();
                formData.append('image', category.image);
                formData.append('name', category.name);
                formData.append('type', category.type);
                addCategory(formData);
                setCategory({
                    name: '',
                    image: '',
                    type: '',
                    id: ''
                });
                setWaiting(false);
            }
    };

    const clearAll = () => clearCurrent();



    const onDelete = (id) => {
        deleteCategory(id);
        clearCurrent();
    };

    if (categories !== null && categories.length === 0 && !loading) {
        return <h4>Please add a category</h4>
    }

    if (loading) return <Spinner />;

    return (
        <div className="row" style={{ overflowX: "hidden" }}>
            <div className="col-xl-6">
                <div className="kt-portlet">
                    <div className="kt-portlet__body">
                        {/*begin::Section*/}
                        <div className="kt-section">
                            <div className="kt-section__content">
                                <div className="kt-portlet__head-toolbar" style={{ marginBottom: "20px" }}>
                                    <div className="kt-portlet__head-wrapper">
                                        <div className="kt-portlet__head-actions">
                                            <a href onClick={() => setWaiting(true)} className="btn btn-brand btn-elevate btn-icon-sm">
                                                <i className="la la-plus" />
                                                Add Category
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead className="thead-light">
                                        <tr>
                                            <th>#</th>
                                            <th>ID</th>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Type</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {filtered != null ? filtered.map((category, index) => (
                                            <tr key={category.id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{category.id}</td>
                                                <td>
                                                    <img src={category.image} alt="" width="30px" height="30px"/>
                                                </td>
                                                <td>{category.name}</td>
                                                <td>{category.Type.name}</td>
                                                <td data-field="Actions" className="kt-datatable__cell">
                                                    <span style={{overFlow: "visible", position: "relative", width: "130px"}}>
                                                        <a href onClick={() => {setCurrent(category); setWaiting(true)}} title="Edit details" className="btn btn-sm btn-clean btn-icon btn-icon-md">
                                                            <i className="la la-edit"/>
                                                        </a>
                                                        <a href onClick={() => onDelete(category.id)} title="Delete" className="btn btn-sm btn-clean btn-icon btn-icon-md">
                                                            <i className="la la-trash"/>
                                                        </a>
                                                    </span>
                                                </td>
                                            </tr>
                                            )) : categories.map((category, index) => (
                                            <tr key={category.id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{category.id}</td>
                                                <td>
                                                    <img src={category.image} alt="" width="30px" height="30px"/>
                                                </td>
                                                <td>{category.name}</td>
                                                <td>{category.Type.name}</td>
                                                <td data-field="Actions" className="kt-datatable__cell">
                                                    <span style={{overFlow: "visible", position: "relative", width: "130px"}}>
                                                        <a href onClick={() => {setCurrent(category); setWaiting(true)}} title="Edit details" className="btn btn-sm btn-clean btn-icon btn-icon-md">
                                                            <i className="la la-edit"/>
                                                        </a>
                                                        <a href onClick={() => onDelete(category.id)} title="Delete" className="btn btn-sm btn-clean btn-icon btn-icon-md">
                                                            <i className="la la-trash"/>
                                                        </a>
                                                    </span>
                                                </td>
                                            </tr>
                                        )) }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {/*end::Section*/}
                    </div>

                    {/*end::Form*/}
                </div>
                <div className="kt-portlet show_modal_custom" style={waiting ? updateStyle : null}>
                    <div className="kt-portlet__head">
                        <div className="kt-portlet__head-label">
                            <h3 className="kt-portlet__head-title">
                                {current ? "Update Category" : "Add Category"}
                            </h3>
                        </div>
                    </div>
                    <form className="kt-form" onSubmit={onSubmit}>
                        <div className="kt-portlet__body">
                            <div className="kt-section">
                                <div className="form-group row">
                                    <label className="col-xl-3 col-lg-3 col-form-label">Image</label>
                                    <div className="col-lg-9 col-xl-6">
                                        <div className="kt-avatar kt-avatar--outline kt-avatar--circle" id="kt_apps_user_add_avatar">
                                            <input type="file" name="image" onChange={onImageChange}
                                                   accept=".png, .jpg, .jpeg"/>
                                        </div>
                                    </div>
                                    {current && <img style={{ marginLeft: "100px" }} src={current.image} width="30px" height="30px" alt=""/>}
                                </div>
                                <div className="form-group" style={{width: "50%", margin: "auto"}}>
                                    <label>Category Name:</label>
                                    <input type="text" name="name" value={name} onChange={onChange}
                                           className="form-control" placeholder="Enter category name"/>
                                    <span className="form-text text-muted">Please enter category name </span>
                                </div>
                                <div className="col-md-4 kt-margin-b-20-tablet-and-mobile"
                                     style={{marginTop: "60px", margin: "auto", width: "50%"}}>
                                    <div className="kt-form__group kt-form__group--inline">
                                        <div className="kt-form__label">
                                            <label>Type:</label>
                                        </div>
                                        <div className="kt-form__control">
                                            <select onChange={onChange} name="type" className="form-control bootstrap-select" id="kt_form_status">
                                                <option value="">Select</option>
                                                {types.map(type => (
                                                    <option value={type.id} key={type.id}>{type.name}</option>
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
                                <button type="reset" className="btn btn-secondary" onClick={() => {setWaiting(false); clearAll()}}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

const updateStyle = {
    transform: `translateX(0)`
};

export default CategoryTable;