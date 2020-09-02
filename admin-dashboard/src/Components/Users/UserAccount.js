import React, {Fragment, useContext, useEffect, useState} from 'react';
import AuthContext from '../../context/auth/authContext';
import {useSnackbar} from 'react-simple-snackbar';
import Spinner from "../layouts/Spinner";


const UserAccount = ({ users }) => {
    const authContext = useContext(AuthContext);

    const { updateUser, msg, error, clearErrors, loading, updatePassword } = authContext;

    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        address: ''
    });

    const [change_password, setChangePassword] = useState({
        old_password: '',
        new_password: '',
        password2: ''
    });

    const [openSnackbar] = useSnackbar();

    useEffect(() => {
        if (users !== null) {
            setUser({
                firstname: users.firstname,
                lastname: users.lastname,
                phone: users.phone,
                address: users.address
            });
        } else {
            setUser({
                firstname: '',
                lastname: '',
                phone: '',
                address: ''
            })
        }

        if (error){
            openSnackbar(error);
            clearAll();
        }

        if (msg) {
            openSnackbar(msg);
            clearAll();
        }

        //eslint-disable-next-line
    }, [error, msg]);

    const { firstname, lastname, phone, address } = user;

    const clearAll = () => clearErrors();

    const { new_password, old_password, password2 } = change_password;

    const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    const onPasswordChange = (e) => setChangePassword({ ...change_password, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        updateUser(user);
        setUser({
            firstname: '',
            lastname: '',
            phone: '',
            address: ''
        });
    };

    const onSubmitPassword = (e) => {
        e.preventDefault();
        if (new_password !== password2) {
            openSnackbar('Confirm password... Password mismatch!!!')
        } else  {
            updatePassword({
                old_password,
                new_password
            });
            setChangePassword({
                old_password: '',
                new_password: '',
                password2: ''
            });
        }
    };


    if (loading) return <Spinner/>;
    return (
        <Fragment>
            <div className="row">
            <div className="col-xl-12">
                <div className="kt-portlet">
                    <div className="kt-portlet__head">
                        <div className="kt-portlet__head-label">
                            <h3 className="kt-portlet__head-title">Personal Information <small>update your personal
                                information</small>
                            </h3>
                        </div>
                    </div>
                    <form className="kt-form kt-form--label-right" onSubmit={onSubmit}>
                        <div className="kt-portlet__body">
                            <div className="kt-section kt-section--first">
                                <div className="kt-section__body">
                                    <div className="row">
                                        <label className="col-xl-3"></label>
                                        <div className="col-lg-9 col-xl-6">
                                            <h3 className="kt-section__title kt-section__title-sm">Customer Info:</h3>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-xl-3 col-lg-3 col-form-label">First Name</label>
                                        <div className="col-lg-9 col-xl-6">
                                            <input className="form-control" type="text" name="firstname" onChange={onChange} value={firstname} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-xl-3 col-lg-3 col-form-label">Last Name</label>
                                        <div className="col-lg-9 col-xl-6">
                                            <input className="form-control" type="text" name="lastname" onChange={onChange} value={lastname} />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="col-xl-3"></label>
                                        <div className="col-lg-9 col-xl-6">
                                            <h3 className="kt-section__title kt-section__title-sm">Contact Info:</h3>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-xl-3 col-lg-3 col-form-label">Contact Phone</label>
                                        <div className="col-lg-9 col-xl-6">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="la la-phone"/>
                                                </span>
                                                </div>
                                                <input type="text" className="form-control" name="phone" onChange={onChange} value={phone}
                                                       placeholder="Phone" aria-describedby="basic-addon1"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-xl-3 col-lg-3 col-form-label">Address</label>
                                        <div className="col-lg-9 col-xl-6">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="la la-home"/>
                                                </span>
                                                </div>
                                                <input type="text" name="address" onChange={onChange} className="form-control" value={address}
                                                       placeholder="Address" aria-describedby="basic-addon1"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="kt-portlet__foot">
                            <div className="kt-form__actions">
                                <div className="row">
                                    <div className="col-lg-3 col-xl-3">
                                    </div>
                                    <div className="col-lg-9 col-xl-9">
                                        <button type="submit" className="btn btn-success">Submit</button>
                                        &nbsp;
                                        <button type="reset" className="btn btn-secondary">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
            <div className="row" id="password">
                <div className="col-xl-12">
                    <div className="kt-portlet">
                        <div className="kt-portlet__head">
                            <div className="kt-portlet__head-label">
                                <h3 className="kt-portlet__head-title">Change Password
                                    <small>change or recover your password</small>
                                </h3>
                            </div>
                        </div>
                        <form className="kt-form kt-form--label-right" onSubmit={onSubmitPassword}>
                            <div className="kt-portlet__body">
                                <div className="kt-section kt-section--first">
                                    <div className="kt-section__body">
                                        <div className="row">
                                            <label className="col-xl-3"></label>
                                            <div className="col-lg-9 col-xl-6">
                                                <h3 className="kt-section__title kt-section__title-sm">Change or recover your password</h3>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-lg-3 col-form-label">Old Password</label>
                                            <div className="col-lg-9 col-xl-6">
                                                <input className="form-control" type="password" name="old_password" value={old_password} onChange={onPasswordChange} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-lg-3 col-form-label">New Password</label>
                                            <div className="col-lg-9 col-xl-6">
                                                <input className="form-control" type="password" name="new_password" value={new_password} onChange={onPasswordChange} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-xl-3 col-lg-3 col-form-label">Confirm Password</label>
                                            <div className="col-lg-9 col-xl-6">
                                                <input className="form-control" type="password" name="password2" value={password2} onChange={onPasswordChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="kt-portlet__foot">
                                <div className="kt-form__actions">
                                    <div className="row">
                                        <div className="col-lg-3 col-xl-3">
                                        </div>
                                        <div className="col-lg-9 col-xl-9">
                                            <button type="submit" className="btn btn-success">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default UserAccount;