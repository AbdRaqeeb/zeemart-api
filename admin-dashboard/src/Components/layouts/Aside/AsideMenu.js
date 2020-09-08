import React, {useEffect, useRef, useState} from 'react';

const list = [
    {
        name: 'Dashboard',
        icon: 'flaticon2-gear',
        link: '/',
        id: 1
    },
    {
        name: 'Products',
        icon: 'flaticon2-layers-1',
        link: '/products',
        id: 2
    },
    {
        name: 'Categories',
        icon: 'flaticon2-graph',
        link: '/category',
        id: 3
    },
    {
        name: 'Types',
        icon: 'flaticon2-menu',
        link: '/type',
        id: 4
    },
    {
        name: 'Orders',
        icon: 'flaticon2-analytics-2',
        link: '/orders',
        id: 5
    },
    {
        name: 'Customers',
        icon: 'flaticon2-group',
        link: '/customers',
        id: 6
    },
];

const AsideMenu = () => {

    return (
        <div className="kt-aside-menu-wrapper kt-grid__item kt-grid__item--fluid" id="kt_aside_menu_wrapper" style={style}>
            <div id="kt_aside_menu" className="kt-aside-menu kt-aside-menu--dropdown menu-aside"  data-ktmenu-vertical="1"
                style={{ height: '100%', width: '100%' }} data-ktmenu-dropdown="1" data-ktmenu-scroll="0">
                <ul id="all_links" className="kt-menu__nav" style={{ display: 'flex', height: '100%', width: '100%', flexDirection: 'column', justifyContent: 'space-between'}}>
                    {list.map((item, i) => {
                        return (
                        <li key={item.id} className="kt-menu__item" aria-haspopup="true" style={{width: '100%', marginBottom: '10px'}}>
                            <a href={item.link} className="kt-menu__link aside_menu_link" style={{ width: '100%' }}>
                                <i style={{ fontSize: '30px', marginBottom: '5px' }} className={`kt-menu__link-icon mobile-icon ${item.icon}`}/>
                                <span style={{ fontSize: '15px' }} className="kt-menu__link-text mobile-text">{item.name}</span>
                            </a>
                        </li>
                    )
                    })}
                </ul>
            </div>
        </div>
    );
};

const style = {
    width: '100%',
    // padding: '0 30px',
};

export default AsideMenu;