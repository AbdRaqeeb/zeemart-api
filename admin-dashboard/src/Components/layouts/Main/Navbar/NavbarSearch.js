import React from 'react';

const NavbarSearch = () => {
    return (
        <div className="kt-header__topbar-item kt-header__topbar-item--search dropdown" id="kt_quick_search_toggle">
            <div className="kt-header__topbar-wrapper" data-toggle="dropdown" data-offset="10px,0px">
                <span className="kt-header__topbar-icon">
                    <i className="flaticon2-search-1"></i>
                </span>
            </div>
            <div className="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-top-unround dropdown-menu-anim dropdown-menu-lg">
                <div className="kt-quick-search kt-quick-search--inline" id="kt_quick_search_inline">
                    <form method="get" className="kt-quick-search__form">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <i className="flaticon2-search-1"></i>
                                </span>
                            </div>
                            <input type="text" className="form-control kt-quick-search__input" placeholder="Search..." />
                                <div className="input-group-append">
                                    <span className="input-group-text">
                                        <i className="la la-close kt-quick-search__close"></i>
                                    </span>
                                </div>
                        </div>
                    </form>
                    <div className="kt-quick-search__wrapper kt-scroll" data-scroll="true" data-height="300"
                         data-mobile-height="200">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavbarSearch;