import React, {useContext, useEffect} from 'react';
import AuthContext from "../../context/auth/authContext";

const UserMenu = () => {
    const authContext = useContext(AuthContext);

    const {users, loadUser} = authContext;

    useEffect(() => {
        loadUser();

        //eslint-disable-next-line
    }, []);


    const {firstname, lastname, email, role, phone, address} = users;
    return (
        <div className="kt-grid__item kt-app__toggle kt-app__aside" id="kt_user_profile_aside">
            {/*begin:: Widgets/Applications/User/Profile1*/}
            <div className="kt-portlet kt-portlet--height-fluid-">
                <div className="kt-portlet__head  kt-portlet__head--noborder">
                    <div className="kt-portlet__head-label">
                        <h3 className="kt-portlet__head-title">
                        </h3>
                    </div>
                    <div className="kt-portlet__head-toolbar">
                        <a href="void" className="btn btn-clean btn-sm btn-icon btn-icon-md" data-toggle="dropdown">
                            <i className="flaticon-more-1"/>
                        </a>
                    </div>
                </div>
                <div className="kt-portlet__body kt-portlet__body--fit-y">
                    {/*begin::Widget */}
                    <div className="kt-widget kt-widget--user-profile-1">
                        <div className="kt-widget__head">
                            <div
                                className="kt-widget__pic kt-widget__pic--danger kt-font-danger kt-font-bolder kt-font-light"
                                style={custom}>
                                    {`${firstname}`.charAt(0).toUpperCase()}{`${lastname}`.charAt(0).toUpperCase()}
                            </div>
                            <div className="kt-widget__content">
                                <div className="kt-widget__section">
                                    <a href="void" className="kt-widget__username">
                                        {firstname} {' '} {lastname}
                                        <i className="flaticon2-correct kt-font-success"></i>
                                    </a>
                                    <span className="kt-widget__subtitle">
                                        {role}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="kt-widget__body">
                            <div className="kt-widget__content">
                                <div className="kt-widget__info">
                                    <span className="kt-widget__label">Email:</span>
                                    <p className="kt-widget__data">{email}</p>
                                </div>
                                <div className="kt-widget__info">
                                    <span className="kt-widget__label">Phone:</span>
                                    <p className="kt-widget__data">{phone}</p>
                                </div>
                                <div className="kt-widget__info">
                                    <span className="kt-widget__label">Location:</span>
                                    <span className="kt-widget__data">{address}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*end::Widget*/}
                </div>
            </div>

            {/*end:: Widgets/Applications/User/Profile1*/}
        </div>
    );
};

const custom = {
    backgroundColor: 'rgba(253, 57, 122, 0.1)',
    height: '80px',
    width: "110px",
    borderRadius: '8px',
    fontSize: '25px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    lineHeight: '27px',
    fontWeight: '600',
    fontFamily: 'Poppins'
};

export default UserMenu;