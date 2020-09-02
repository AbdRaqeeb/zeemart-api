import React from 'react';

const AsideMenu = () => {
    return (
        <div className="kt-aside-menu-wrapper kt-grid__item kt-grid__item--fluid" id="kt_aside_menu_wrapper">
            <div id="kt_aside_menu" className="kt-aside-menu  kt-aside-menu--dropdown " data-ktmenu-vertical="1"
                 data-ktmenu-dropdown="1" data-ktmenu-scroll="0">
                <ul className="kt-menu__nav ">
                    <li className="kt-menu__item  kt-menu__item--active" aria-haspopup="true">
                        <a href="/" className="kt-menu__link ">
                            <i className="kt-menu__link-icon flaticon2-gear"></i>
                            <span className="kt-menu__link-text">Dashboard</span>
                        </a>
                    </li>
                    <li className="kt-menu__item " aria-haspopup="true">
                        <a href="/products" className="kt-menu__link">
                            <i className="kt-menu__link-icon flaticon2-layers-1"></i>
                            <span className="kt-menu__link-text">Products</span>
                        </a>
                    </li>
                    <li className="kt-menu__item " aria-haspopup="true">
                        <a href="/category" className="kt-menu__link ">
                            <i className="kt-menu__link-icon flaticon2-graph"></i>
                            <span className="kt-menu__link-text">Category</span>
                        </a>
                    </li>
                    <li className="kt-menu__item " aria-haspopup="true">
                        <a href="/type" className="kt-menu__link ">
                            <i className="kt-menu__link-icon flaticon2-menu"></i>
                            <span className="kt-menu__link-text">Types</span>
                        </a>
                    </li>
                    <li className="kt-menu__item " aria-haspopup="true">
                        <a href="/orders" className="kt-menu__link ">
                            <i className="kt-menu__link-icon flaticon2-analytics-2"></i>
                            <span className="kt-menu__link-text">Orders</span>
                        </a>
                    </li>
                    <li className="kt-menu__item " aria-haspopup="true">
                        <a href="/customers" className="kt-menu__link ">
                            <i className="kt-menu__link-icon flaticon2-protected"></i>
                            <span className="kt-menu__link-text">Customers</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AsideMenu;