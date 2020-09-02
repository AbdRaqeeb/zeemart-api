import React, {useContext, useEffect} from 'react';
import CustomerContext from "../../context/customers/customerContext";
import AdminContext from "../../context/admin/adminContext";
import OrderContext from "../../context/orders/orderContext";
import ProductContext from "../../context/product/productContext";
const Dashboard = () => {
    const customerContext = useContext(CustomerContext);
    const adminContext = useContext(AdminContext);
    const orderContext = useContext(OrderContext);
    const productContext = useContext(ProductContext);
    const {customers, getCustomers} = customerContext;
    const { getOrders, orders } = orderContext;
    const { getAdmins, admins } = adminContext;
    const { getProducts, products } = productContext;

    useEffect(() => {
        getCustomers();
        getAdmins();
        getOrders();
        getProducts();

        //eslint-disable-next-line
    }, []);

    return (
        <div className="row">
            <div className="col-xl-4">
                <div
                    className="kt-portlet kt-portlet--fit kt-portlet--head-lg kt-portlet--head-overlay kt-portlet--skin-solid kt-portlet--height-fluid">
                    <div className="kt-portlet__body kt-portlet__body--fit">
                        <div className="kt-widget17">
                            <div style={style} className="kt-widget17__stats">
                                <div className="kt-widget17__items">
                                    <div className="kt-widget17__item">
                                        <span className="kt-widget17__icon">
                                             <svg xmlns="http://www.w3.org/2000/svg"
                                                  xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px"
                                                  viewBox="0 0 24 24" version="1.1" className="kt-svg-icon">
                                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                <polygon id="Shape" points="0 0 24 0 24 24 0 24"/>
                                                <path
                                                    d="M18,14 C16.3431458,14 15,12.6568542 15,11 C15,9.34314575 16.3431458,8 18,8 C19.6568542,8 21,9.34314575 21,11 C21,12.6568542 19.6568542,14 18,14 Z M9,11 C6.790861,11 5,9.209139 5,7 C5,4.790861 6.790861,3 9,3 C11.209139,3 13,4.790861 13,7 C13,9.209139 11.209139,11 9,11 Z"
                                                    id="Combined-Shape" fill="#000000" fillRule="nonzero"
                                                    opacity="0.3"/>
                                                <path
                                                    d="M17.6011961,15.0006174 C21.0077043,15.0378534 23.7891749,16.7601418 23.9984937,20.4 C24.0069246,20.5466056 23.9984937,21 23.4559499,21 L19.6,21 C19.6,18.7490654 18.8562935,16.6718327 17.6011961,15.0006174 Z M0.00065168429,20.1992055 C0.388258525,15.4265159 4.26191235,13 8.98334134,13 C13.7712164,13 17.7048837,15.2931929 17.9979143,20.2 C18.0095879,20.3954741 17.9979143,21 17.2466999,21 C13.541124,21 8.03472472,21 0.727502227,21 C0.476712155,21 -0.0204617505,20.45918 0.00065168429,20.1992055 Z"
                                                    id="Combined-Shape" fill="#000000" fillRule="nonzero"/>
                                            </g>
                                        </svg>
                                        </span>
                                        <span className="kt-widget17__subtitle">
                                    Customers
                                </span>
                                        <span className="kt-widget17__desc">
                                            {customers.length === 0 ? 0 : customers.length} customers
                                </span>
                                    </div>
                                    <div className="kt-widget17__item">
                                <span className="kt-widget17__icon">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         xmlnsXlink="http://www.w3.org/1999/xlink"
                                         width="24px" height="24px" viewBox="0 0 24 24" version="1.1"
                                         className="kt-svg-icon"
                                    >
                                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                            <polygon id="Shape" points="0 0 24 0 24 24 0 24"/>
                                            <path d="M12,11 C9.790861,11 8,9.209139 8,7 C8,4.790861 9.790861,3 12,3 C14.209139,3 16,4.790861 16,7 C16,9.209139 14.209139,11 12,11 Z"
                                                  id="Mask" fill="#000000"
                                                  fillRule="nonzero" opacity="0.3"
                                            />
                                            <path d="M3.00065168,20.1992055 C3.38825852,15.4265159 7.26191235,13 11.9833413,13 C16.7712164,13 20.7048837,15.2931929 20.9979143,20.2 C21.0095879,20.3954741 20.9979143,21 20.2466999,21 C16.541124,21 11.0347247,21 3.72750223,21 C3.47671215,21 2.97953825,20.45918 3.00065168,20.1992055 Z"
                                                  id="Mask-Copy" fill="#000000" fillRule="nonzero"/>
                                        </g>
                                    </svg>
                                </span>
                                        <span className="kt-widget17__subtitle">
                                    Admins
                                </span>
                                        <span className="kt-widget17__desc">
                                             {admins.length === 0 ? 0 : admins.length} admins
                                </span>
                                    </div>
                                </div>
                                <div className="kt-widget17__items">
                                    <div className="kt-widget17__item">
                                <span className="kt-widget17__icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                         width="24px" height="24px" viewBox="0 0 24 24" version="1.1"
                                         className="kt-svg-icon"
                                    >
                                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                            <rect id="bound" x="0" y="0" width="24" height="24"/>
                                            <path d="M18.1446364,11.84388 L17.4471627,16.0287218 C17.4463569,16.0335568 17.4455155,16.0383857 17.4446387,16.0432083 C17.345843,16.5865846 16.8252597,16.9469884 16.2818833,16.8481927 L4.91303792,14.7811299 C4.53842737,14.7130189 4.23500006,14.4380834 4.13039941,14.0719812 L2.30560137,7.68518803 C2.28007524,7.59584656 2.26712532,7.50338343 2.26712532,7.4104669 C2.26712532,6.85818215 2.71484057,6.4104669 3.26712532,6.4104669 L16.9929851,6.4104669 L17.606173,3.78251876 C17.7307772,3.24850086 18.2068633,2.87071314 18.7552257,2.87071314 L20.8200821,2.87071314 C21.4717328,2.87071314 22,3.39898039 22,4.05063106 C22,4.70228173 21.4717328,5.23054898 20.8200821,5.23054898 L19.6915238,5.23054898 L18.1446364,11.84388 Z"
                                                  id="Combined-Shape" fill="#000000" opacity="0.3"
                                            />
                                            <path d="M6.5,21 C5.67157288,21 5,20.3284271 5,19.5 C5,18.6715729 5.67157288,18 6.5,18 C7.32842712,18 8,18.6715729 8,19.5 C8,20.3284271 7.32842712,21 6.5,21 Z M15.5,21 C14.6715729,21 14,20.3284271 14,19.5 C14,18.6715729 14.6715729,18 15.5,18 C16.3284271,18 17,18.6715729 17,19.5 C17,20.3284271 16.3284271,21 15.5,21 Z"
                                                  id="Combined-Shape" fill="#000000"
                                            />
                                        </g>
                                    </svg>
                                </span>
                                        <span className="kt-widget17__subtitle">
                                    Orders
                                </span>
                                        <span className="kt-widget17__desc">
                                             {orders.length === 0 ? 0 : orders.length} orders made.
                                </span>
                                    </div>
                                    <div className="kt-widget17__item">
                                <span className="kt-widget17__icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                         width="24px" height="24px" viewBox="0 0 24 24" version="1.1"
                                         className="kt-svg-icon">
                                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                            <rect id="bound" x="0" y="0" width="24" height="24"/>
                                            <path d="M4,9.67471899 L10.880262,13.6470401 C10.9543486,13.689814 11.0320333,13.7207107 11.1111111,13.740321 L11.1111111,21.4444444 L4.49070127,17.526473 C4.18655139,17.3464765 4,17.0193034 4,16.6658832 L4,9.67471899 Z M20,9.56911707 L20,16.6658832 C20,17.0193034 19.8134486,17.3464765 19.5092987,17.526473 L12.8888889,21.4444444 L12.8888889,13.6728275 C12.9050191,13.6647696 12.9210067,13.6561758 12.9368301,13.6470401 L20,9.56911707 Z"
                                                  id="Combined-Shape" fill="#000000"
                                            />
                                            <path d="M4.21611835,7.74669402 C4.30015839,7.64056877 4.40623188,7.55087574 4.5299008,7.48500698 L11.5299008,3.75665466 C11.8237589,3.60013944 12.1762411,3.60013944 12.4700992,3.75665466 L19.4700992,7.48500698 C19.5654307,7.53578262 19.6503066,7.60071528 19.7226939,7.67641889 L12.0479413,12.1074394 C11.9974761,12.1365754 11.9509488,12.1699127 11.9085461,12.2067543 C11.8661433,12.1699127 11.819616,12.1365754 11.7691509,12.1074394 L4.21611835,7.74669402 Z"
                                                  id="Path" fill="#000000" opacity="0.3"
                                            />
                                        </g>
                                    </svg>
                                </span>
                                        <span className="kt-widget17__subtitle">
                                    Products
                                </span>
                                        <span className="kt-widget17__desc">
                                             {products.length === 0 ? 0 : products.length} products available.
                                </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const style = {
    position: "absolute",
    top: "100px",
};

export default Dashboard;