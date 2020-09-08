import React, {useContext, useEffect, useState} from 'react';
import AuthContext from '../../context/auth/authContext';
import {useSnackbar} from 'react-simple-snackbar';

const Auth = (props) => {
    const authContext = useContext(AuthContext);
    const {login, errorBool, errorMsg, clearErrors, isAuthenticated} = authContext;

    const [openSnackbar] = useSnackbar();

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }

        if (errorBool === true) {
            openSnackbar(errorMsg);
            setWaiting(false);
            clearErrors()
        }

        //eslint-disable-next-line
    }, [errorBool, errorMsg, isAuthenticated, props.history]);

    const [waiting, setWaiting] = useState(false);


    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const {email, password} = user;

    const onChange = (e) => setUser({...user, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        if (email === '' || password === '') {
            openSnackbar('All fields required');
            setWaiting(false);
        } else {
            login({
                email,
                password
            });
        }

    };


    return (
        <div className="kt-grid kt-grid--ver kt-grid--root">
            <div className="kt-grid kt-grid--hor kt-grid--root kt-login kt-login--v2 kt-login--signin" id="kt_login">
                <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor"
                     style={{backgroundImage: `url(https://res.cloudinary.com/dho9flazo/image/upload/v1599595579/dashboard/logos/bg-1_uiiwsq.jpg)`, height: '100vh'}}>
                    <div className="kt-grid__item kt-grid__item--fluid kt-login__wrapper">
                        <div className="kt-login__container">
                            <div className="kt-login__logo">
                                <a href>
                                    <img src="https://res.cloudinary.com/dho9flazo/image/upload/v1599595460/dashboard/logos/log_dbqs6k.png" alt=""/>
                                </a>
                            </div>
                            <div className="kt-login__signin">
                                <div className="kt-login__head">
                                    <h3 className="kt-login__title">Sign In To Dashboard</h3>
                                </div>
                                <form className="kt-form" onSubmit={onSubmit}>
                                    <div className="input-group">
                                        <input value={email} onChange={onChange} className="form-control" type="text"
                                               placeholder="Email" name="email"
                                               autoComplete="off"/>
                                    </div>
                                    <div className="input-group">
                                        <input value={password} onChange={onChange} className="form-control" type="password"
                                               placeholder="Password"
                                               name="password"/>
                                    </div>
                                    <div className="row kt-login__extra">
                                        <div className="col">
                                            <label className="kt-checkbox">
                                                <input type="checkbox" name="remember"/> Remember me
                                                <span></span>
                                            </label>
                                        </div>
                                        <div className="col kt-align-right">
                                            <a href id="kt_login_forgot" className="kt-link kt-login__link">Forget
                                                Password ?</a>
                                        </div>
                                    </div>
                                    <div className="kt-login__actions">
                                        <button id="kt_login_signin_submit"
                                                onClick={() => { setWaiting(true);}}
                                                className={waiting ? b_loading : b_not_loading}>Sign In
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="kt-login__signup">
                                <div className="kt-login__head">
                                    <h3 className="kt-login__title">Sign Up</h3>
                                    <div className="kt-login__desc">Enter your details to create your account:</div>
                                </div>
                                <form className="kt-login__form kt-form" action="">
                                    <div className="input-group">
                                        <input className="form-control" type="text" placeholder="Fullname" name="fullname"/>
                                    </div>
                                    <div className="input-group">
                                        <input className="form-control" type="text" placeholder="Email" name="email"
                                               autoComplete="off"/>
                                    </div>
                                    <div className="input-group">
                                        <input className="form-control" type="password" placeholder="Password"
                                               name="password"/>
                                    </div>
                                    <div className="input-group">
                                        <input className="form-control" type="password" placeholder="Confirm Password"
                                               name="password"/>
                                    </div>
                                    <div className="row kt-login__extra">
                                        <div className="col kt-align-left">
                                            <label className="kt-checkbox">
                                                <input type="checkbox" name="agree"/>I Agree the
                                                <a href className="kt-link kt-login__link kt-font-bold">terms
                                                    and conditions
                                                </a>.
                                                <span></span>
                                            </label>
                                            <span className="form-text text-muted"></span>
                                        </div>
                                    </div>
                                    <div className="kt-login__actions">
                                        <button id="kt_login_signup_submit"
                                                className="btn btn-pill kt-login__btn-primary">Sign Up
                                        </button>
                                        &nbsp;&nbsp;
                                        <button id="kt_login_signup_cancel"
                                                className="btn btn-pill kt-login__btn-secondary">Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="kt-login__forgot">
                                <div className="kt-login__head">
                                    <h3 className="kt-login__title">Forgotten Password ?</h3>
                                    <div className="kt-login__desc">Enter your email to reset your password:</div>
                                </div>
                                <form className="kt-form" action="">
                                    <div className="input-group">
                                        <input className="form-control" type="text" placeholder="Email" name="email"
                                               id="kt_email" autoComplete="off"/>
                                    </div>
                                    <div className="kt-login__actions">
                                        <button id="kt_login_forgot_submit"
                                                className="btn btn-pill kt-login__btn-primary">Request
                                        </button>
                                        &nbsp;&nbsp;
                                        <button id="kt_login_forgot_cancel"
                                                className="btn btn-pill kt-login__btn-secondary">Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                            {/*<div className="kt-login__account">*/}
                            {/*		<span className="kt-login__account-msg">*/}
                            {/*			Don't have an account yet ?*/}
                            {/*		</span>&nbsp;&nbsp;*/}
                            {/*    <a href id="kt_login_signup" className="kt-link kt-link--light kt-login__account-link">Sign Up</a>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const b_loading = "btn btn-pill kt-login__btn-primary kt-spinner kt-spinner--v2 kt-spinner--right kt-spinner--lg kt-spinner--success";
const b_not_loading = "btn btn-pill kt-login__btn-primary";

export default Auth;