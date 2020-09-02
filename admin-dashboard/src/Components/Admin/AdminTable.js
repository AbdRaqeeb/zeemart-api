import React, {useContext, useEffect, useState} from 'react';
import AdminContext from "../../context/admin/adminContext";
import Spinner from "../layouts/Spinner";
import {useSnackbar} from 'react-simple-snackbar';

const AdminTable = ({ filtered, admins }) => {
    const adminContext = useContext(AdminContext);
    const {loading, setCurrent, current, clearCurrent, updateAdminStatus, registerAdmin, clearErrors, msg, error, deleteAdmin} = adminContext;

    const [openSnackbar] = useSnackbar();

    const [waiting, setWaiting] = useState(false);

    const [form, setForm] = useState(false);

    const [admin, setAdmin] = useState({
        status: '',
        admin_id: ''
    });

    const [admin_form, setAdminForm] = useState({
       firstname: '',
       lastname: '',
       email: '',
       Password: 123456,
       role: 'Admin',
       phone: ''
    });

    let password = 123456;


    useEffect(() => {
        if (current !== null) {
            setAdmin({
                admin_id: current.admin_id,
                status: current.status
            });
        } else {
            setAdmin({
                status: '',
                admin_id: ''
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
    }, [adminContext, current, msg, error]);

    const { firstname, lastname, Password, role, phone, email } = admin_form;

    const onChange = e => setAdmin({...admin, [e.target.name]: e.target.value});

    const onAdminChange = (e) => setAdminForm({ ...admin_form, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        updateAdminStatus(admin);
        setAdmin({
            status: '',
            admin_id: ''
        });
        clearAll();
        setWaiting(false);
    };


    const onSubmitForm = (e) => {
        e.preventDefault();

        //eslint-disable-next-line
        {Password ? password = Password.toString() : '123456'}
        registerAdmin({
            firstname,
            lastname,
            email,
            password,
            phone,
            role
        });
        setAdminForm({
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            password: '123456',
            role: 'Admin'
        });
    };

    const onDelete = (id) => {
        deleteAdmin(id);
        clearMsg();
    };

    const clearMsg = () => clearErrors();
    const clearAll = () => clearCurrent();

    if (admins !== null && admins.length === 0 && !loading) {
        return <h4>No admin available</h4>
    }

    if (loading) return <Spinner/>;

    if (msg === 'Unauthorized Resource') return <div>Unauthorized</div>;

    return (
        <div className="row" style={{ overflowX: "hidden" }}>
            <div className="col-xl-11">
                <div className="kt-portlet">
                    <div className="kt-portlet__body">
                        {/*begin::Section*/}
                        <div className="kt-section">
                            <div className="kt-portlet__head-toolbar" style={{ marginBottom: "20px" }}>
                                <div className="kt-portlet__head-wrapper">
                                    <div className="kt-portlet__head-actions">
                                        <a href onClick={() => setForm(true)}  className="btn btn-brand btn-elevate btn-icon-sm">
                                            <i className="la la-plus" />
                                            Add Admin
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="kt-section__content">
                                <div className="tableaddress === null ? 'Nil' : addressresponsive">
                                    <table className="table table-bordered">
                                        <thead className="thead-light">
                                        <tr>
                                            <th>#</th>
                                            <th>Admin ID</th>
                                            <th>Name</th>
                                            <th>Phone</th>
                                            <th>Total Products</th>
                                            <th>Role</th>
                                            <th>Address</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {filtered != null ? filtered.map((admin, index) => (
                                            <tr key={admin.admin_id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{admin.admin_id}</td>
                                                <td>{admin.lastname}{' '}{admin.firstname}</td>
                                                <td>{admin.phone}</td>
                                                <td>{admin.Products.length}</td>
                                                <td>{admin.role}</td>
                                                <td>{admin.address === null ? 'Nil' : admin.address}</td>
                                                <td>
                                                    <span className={' kt-badge--inline kt-badge--pill kt-badge--rounded kt-badge ' + (admin.status === 'active' ? 'kt-badge--success' : (admin.status === 'suspend') ? 'kt-badge--warning' : 'kt-badge--danger')}>
                                                        {admin.status}
                                                    </span>
                                                </td>
                                                <td data-field="Actions" className="kt-datatable__cell">
                                                    <span style={{overflow: "visible", position: "relative", width: "130px"}}>
                                                        <a href title="View" onClick={() => {
                                                            setCurrent(admin);
                                                            setWaiting(true);
                                                        }} className="btn btn-sm btn-clean btn-icon btn-icon-md">
                                                            <i className="la la-edit"/>
                                                        </a>
                                                         <a href title="Delete"
                                                            onClick={() => onDelete(admin.admin_id)}
                                                            className="btn btn-sm btn-clean btn-icon btn-icon-md">
                                                            <i className="la la-trash"/>
                                                         </a>
                                                    </span>
                                                </td>
                                            </tr>
                                        )) : admins.map((admin, index) => (
                                            <tr key={admin.admin_id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{admin.admin_id}</td>
                                                <td>{admin.lastname}{' '}{admin.firstname}</td>
                                                <td>{admin.phone}</td>
                                                <td>{admin.Products.length}</td>
                                                <td>{admin.role}</td>
                                                <td>{admin.address === null ? 'Nil' : admin.address}</td>
                                                <td>
                                                    <span className={' kt-badge--inline kt-badge--pill kt-badge--rounded kt-badge ' + (admin.status === 'active' ? 'kt-badge--success' : (admin.status === 'suspend') ? 'kt-badge--warning' : 'kt-badge--danger')}>
                                                        {admin.status}
                                                    </span>
                                                </td>
                                                <td data-field="Actions" className="kt-datatable__cell">
                                                    <span style={{overflow: "visible", position: "relative", width: "130px"}}>
                                                         <a href title="View" onClick={() => {
                                                             setCurrent(admin);
                                                             setWaiting(true);
                                                         }} className="btn btn-sm btn-clean btn-icon btn-icon-md">
                                                            <i className="la la-edit"/>
                                                        </a>
                                                        <a href title="Delete"
                                                           onClick={() => onDelete(admin.admin_id)}
                                                           className="btn btn-sm btn-clean btn-icon btn-icon-md">
                                                            <i className="la la-trash"/>
                                                         </a>
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
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
                                Update Status
                            </h3>
                        </div>
                    </div>
                    <form className="kt-form" onSubmit={onSubmit}>
                        <div className="kt-portlet__body">
                            <div className="kt-section">
                                <div className="col-md-4 kt-margin-b-20-tablet-and-mobile"
                                     style={{marginTop: "60px", margin: "auto", width: "50%"}}>
                                    <div className="kt-form__group kt-form__group--inline">
                                        <div className="kt-form__label">
                                            <label>Status:</label>
                                        </div>
                                        <div className="kt-form__control">
                                            <select onChange={onChange} name="status" className="form-control bootstrap-select"
                                                    id="kt_form_status">
                                                <option value="">Select</option>
                                                <option value="active">Active</option>
                                                <option value="suspend">Suspend</option>
                                                <option value="ban">Ban</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="kt-portlet__foot">
                            <div className="kt-form__actions">
                                <button type="submit" className="btn btn-primary">Submit</button>
                                <button type="reset" onClick={() => {
                                    setWaiting(false);
                                    clearAll()
                                }} className="btn btn-secondary">Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="kt-portlet show_admin_form" style={form ? showForm : null}>
                    <div className="kt-portlet__head">
                        <div className="kt-portlet__head-label">
                            <h3 className="kt-portlet__head-title">
                                Add Admin
                            </h3>
                        </div>
                    </div>
                    <form className="kt-form kt-form--label-right" onSubmit={onSubmitForm}>
                        <div className="kt-portlet__body">
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>First Name:</label>
                                    <input type="text"
                                           name="firstname"
                                           onChange={onAdminChange}
                                           value={firstname}
                                           className="form-control"
                                    />
                                    <span className="form-text text-muted">Please enter first name</span>
                                </div>
                                <div className="col-lg-6">
                                    <label className="">Last Name:</label>
                                    <input type="text"
                                           className="form-control"
                                           name="lastname"
                                           value={lastname}
                                           onChange={onAdminChange}
                                    />
                                    <span className="form-text text-muted">Please enter last name</span>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>Email</label>
                                    <div className="kt-input-icon">
                                        <input type="email"
                                               className="form-control"
                                               name="email"
                                               value={email}
                                               onChange={onAdminChange}
                                        />
                                        <span className="kt-input-icon__icon kt-input-icon__icon--right">
                                                <span><i className="la la-envelope"/>
                                                </span>
                                            </span>
                                    </div>
                                    <span className="form-text text-muted">Please enter email</span>
                                </div>
                                <div className="col-lg-6">
                                    <label className="">Password</label>
                                    <div className="kt-input-icon">
                                        <input type="password"
                                               className="form-control"
                                               name="password"
                                               value={Password}
                                               onChange={onAdminChange}
                                        />
                                    </div>
                                    <span className="form-text text-muted">Please enter password</span>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-lg-6">
                                    <label>Admin Group:</label>
                                    <div className="kt-radio-inline">
                                        <label className="kt-radio kt-radio--solid">
                                            <input type="radio"
                                                   name="role"
                                                   checked={role === 'SuperAdmin'}
                                                   onChange={onAdminChange}
                                                   value="SuperAdmin"
                                            />
                                            Super Admin
                                            <span></span>
                                        </label>
                                        <label className="kt-radio kt-radio--solid">
                                            <input type="radio"
                                                   name="role"
                                                   value="Admin"
                                                   checked={role === 'Admin'}
                                                   onChange={onAdminChange}
                                            /> Admin
                                            <span></span>
                                        </label>
                                    </div>
                                    <span className="form-text text-muted">Please select admin group</span>
                                </div>
                                <div className="col-lg-6">
                                    <label>Phone</label>
                                    <div className="kt-input-icon">
                                        <input type="number"
                                               className="form-control"
                                               name="phone"
                                               value={phone}
                                               onChange={onAdminChange}
                                        />
                                        <span className="kt-input-icon__icon kt-input-icon__icon--right">
                                                <span>
                                                    <i className="la la-phone"/>
                                                </span>
                                            </span>
                                    </div>
                                    <span className="form-text text-muted">Please enter phone</span>
                                </div>
                            </div>
                        </div>
                        <div className="kt-portlet__foot">
                            <div className="kt-form__actions">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                    <div className="col-lg-6 kt-align-right">
                                        <button type="reset" onClick={() => setForm(false)} className="btn btn-danger">Cancel</button>
                                    </div>
                                </div>
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

const showForm = {
    display: "block"
};

export default AdminTable;