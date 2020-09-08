import React, {useContext} from 'react';
import AuthContext from '../../../../context/auth/authContext';
import Spinner from "../../Spinner";

const NavbarProfile = ({ users, loading }) => {
    const authContext = useContext(AuthContext);
    const {logout} = authContext;


    const onLogout = () => {
        logout();
    };

    if (loading) return <Spinner />;

    return (
        <div className="kt-header__topbar-item kt-header__topbar-item--user">
            <div className="kt-header__topbar-wrapper" data-toggle="dropdown" data-offset="0px,0px">
                <div className="kt-header__topbar-user">
                    <span className=" kt-header__topbar-welcome kt-hidden-mobile">Hi,</span>
                    <span className=" kt-header__topbar-username kt-hidden-mobile">{users.firstname}</span>

                    <span
                        className="kt-badge kt-badge--username kt-badge--unified-success kt-badge--lg kt-badge--rounded kt-badge--bolder">
                        {`${users.firstname}`.charAt(0).toUpperCase()}
                    </span>
                </div>
            </div>
            <div
                className="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl">


                <div className="kt-user-card kt-user-card--skin-dark kt-notification-item-padding-x"
                     style={{backgroundImage: `url(https://res.cloudinary.com/dho9flazo/image/upload/v1599595579/dashboard/logos/bg-1_uiiwsq.jpg)`}}>
                    <div className="kt-user-card__avatar">


                        <span className="kt-badge kt-badge--lg kt-badge--rounded kt-badge--bold kt-font-success">
                            {`${users.firstname}`.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div className="kt-user-card__name">
                        {users.firstname} {' '} {users.lastname}
                    </div>
                </div>


                <div className="kt-notification">
                    <a href="/user" className="kt-notification__item">
                        <div className="kt-notification__item-icon">
                            <i className="flaticon2-calendar-3 kt-font-success"/>
                        </div>
                        <div className="kt-notification__item-details">
                            <div className="kt-notification__item-title kt-font-bold">
                                My Profile
                            </div>
                            <div className="kt-notification__item-time">
                                Account settings and more
                            </div>
                        </div>
                    </a>
                    <a href="/admin" className="kt-notification__item">
                        <div className="kt-notification__item-icon">
                            <i className="flaticon2-user kt-font-warning"></i>
                        </div>
                        <div className="kt-notification__item-details">
                            <div className="kt-notification__item-title kt-font-bold">
                                Admin
                            </div>
                            <div className="kt-notification__item-time">
                                List of admins
                            </div>
                        </div>
                    </a>
                    <div className="kt-notification__custom kt-space-between">
                        <a href target="_blank" onClick={onLogout}
                           className="btn btn-label btn-label-brand btn-sm btn-bold">Sign Out</a>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default NavbarProfile;
