import React from 'react';

const NavbarNotification = () => {
    return (
        <div className="kt-header__topbar-item dropdown">
            <div className="kt-header__topbar-wrapper" data-toggle="dropdown" data-offset="10px,0px" aria-expanded="true">
                <span className="kt-header__topbar-icon">
                    <i className="flaticon2-bell-alarm-symbol"/>
                </span>
                <span className="kt-hidden kt-badge kt-badge--dot kt-badge--notify kt-badge--sm"></span>
            </div>
            <div className="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-lg">
                <form>
                    <div className="kt-head kt-head--skin-light kt-head--fit-x kt-head--fit-b">
                        <h3 className="kt-head__title">
                            User Notifications
                            &nbsp;
                            <span className="btn btn-label-primary btn-sm btn-bold btn-font-md">23 new</span>
                        </h3>
                        <ul className="nav nav-tabs nav-tabs-line nav-tabs-bold nav-tabs-line-3x nav-tabs-line-brand  kt-notification-item-padding-x"
                            role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active show" data-toggle="tab"
                                   href="#topbar_notifications_notifications" role="tab" aria-selected="true">Alerts</a>
                            </li>
                        </ul>
                    </div>

                    <div className="tab-content">
                        <div className="tab-pane active show" id="topbar_notifications_notifications" role="tabpanel">
                            <div className="kt-notification kt-margin-t-10 kt-margin-b-10 kt-scroll" data-scroll="true" data-height="300" data-mobile-height="200">
                                <a href="/orders" className="kt-notification__item">
                                    <div className="kt-notification__item-icon">
                                        <i className="flaticon2-line-chart kt-font-success"/>
                                    </div>
                                    <div className="kt-notification__item-details">
                                        <div className="kt-notification__item-title">
                                            10 new order(s) has been received
                                        </div>
                                        <div className="kt-notification__item-time">
                                            2 hrs ago
                                        </div>
                                    </div>
                                </a>
                                <a href="/customers" className="kt-notification__item kt-notification__item">
                                    <div className="kt-notification__item-icon">
                                        <i className="flaticon2-safe kt-font-primary"/>
                                    </div>
                                    <div className="kt-notification__item-details">
                                        <div className="kt-notification__item-title">
                                           2 new user registered
                                        </div>
                                        <div className="kt-notification__item-time">
                                            19 hrs ago
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
);
};

export default NavbarNotification;