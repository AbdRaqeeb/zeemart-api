import React, {useContext, useEffect, useState} from 'react';
import TypeContext from "../../context/type/typeContext";
import Spinner from "../layouts/Spinner";
import {useSnackbar} from 'react-simple-snackbar';

const TypeTable = ({ filtered, types }) => {
    const typeContext = useContext(TypeContext);

    const { updateType, addType, loading, setCurrent, clearCurrent, current, deleteType, msg, clearErrors, error } = typeContext;

    const [waiting, setWaiting] = useState(false);

    const [type, setType] = useState({
        name: '',
        id: ''
    });

    const [openSnackbar] = useSnackbar();

    useEffect(() => {
        if (current !== null) {
            setType({
                name: current.name,
                id: current.id
            });
        } else {
            setType({
                name: '',
                id: ''
            });
        }

        if (error) {
            openSnackbar(error);
            clearErrors();
        }

        if (msg) {
            openSnackbar(msg)
        }

        //eslint-disable-next-line
    }, [typeContext, current, msg]);


    const onChange = (e) => setType({ ...type, [e.target.name]: e.target.value });

    const { name } = type;

    const onSubmit = (e) => {
        e.preventDefault();
        if (current !== null) {
            updateType(type);
            setType({
                name: '',
                id: '',
            });
            setWaiting(false);
            clearAll();
        } else {
            addType(type);
            setType({
                name: '',
                id: '',
            });
            setWaiting(false);
            clearAll();
        }

    };

    const clearAll = () => clearCurrent();

    const onDelete = (id) => {
      deleteType(id)
    };

    if (types !== null && types.length === 0 && !loading) {
        return <h4>Please add a category</h4>
    };

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
                                                Add Type
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
                                            <th>Name</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {filtered != null ? filtered.map((type, index) => (
                                            <tr key={type.id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{type.id}</td>
                                                <td>{type.name}</td>
                                                <td data-field="Actions" className="kt-datatable__cell">
                                                    <span style={{overFlow: "visible", position: "relative", width: "130px"}}>
                                                        <a href onClick={() => {setCurrent(type); setWaiting(true)}} title="Edit details" className="btn btn-sm btn-clean btn-icon btn-icon-md">
                                                            <i className="la la-edit"/>
                                                        </a>
                                                        <a href onClick={() => onDelete(type.id)} title="Delete" className="btn btn-sm btn-clean btn-icon btn-icon-md">
                                                            <i className="la la-trash"/>
                                                        </a>
                                                    </span>
                                                </td>
                                            </tr>
                                        )) : types.map((type, index) => (
                                            <tr key={type.id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{type.id}</td>
                                                <td>{type.name}</td>
                                                <td data-field="Actions" className="kt-datatable__cell">
                                                    <span style={{overFlow: "visible", position: "relative", width: "130px"}}>
                                                        <a href onClick={() => {setCurrent(type); setWaiting(true)}} title="Edit details" className="btn btn-sm btn-clean btn-icon btn-icon-md">
                                                            <i className="la la-edit"/>
                                                        </a>
                                                        <a href onClick={() => onDelete(type.id)} title="Delete" className="btn btn-sm btn-clean btn-icon btn-icon-md">
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
                                { current ? 'Update Type' : 'Add Type'}
                            </h3>
                        </div>
                    </div>
                    <form onSubmit={onSubmit} className="kt-form">
                        <div className="kt-portlet__body">
                            <div className="kt-section">
                                <div className="form-group" style={{width: "50%", margin: "auto"}}>
                                    <label>Type:</label>
                                    <input type="text" name="name" className="form-control" onChange={onChange} value={name} />
                                    <span className="form-text text-muted">Please enter type name </span>
                                </div>
                            </div>
                        </div>
                        <div className="kt-portlet__foot">
                            <div className="kt-form__actions">
                                <button type="submit" className="btn btn-primary">Submit</button>
                                <button type="reset" onClick={() => setWaiting(false)} className="btn btn-secondary">Cancel</button>
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

export default TypeTable;