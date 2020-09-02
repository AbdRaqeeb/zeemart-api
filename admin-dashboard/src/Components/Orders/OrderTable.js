import React, {useContext, useEffect, useState} from 'react';
import OrderContext from "../../context/orders/orderContext";
import Spinner from "../layouts/Spinner";
import {useSnackbar} from 'react-simple-snackbar';
import { addComma } from '../../utils/formatNumber';

const OrderTable = ({orders, filtered}) => {
    const orderContext = useContext(OrderContext);
    const {loading, setCurrent, current, clearCurrent, updateOrder, getOneOrder, orderDetails, error, msg} = orderContext;

    const [openSnackbar] = useSnackbar();

    const [waiting, setWaiting] = useState(false);
    const [detail, setDetail] = useState(false);
    const [order, setOrder] = useState({
        shipped_on: '',
        status: '',
        order_id: ''
    });

    useEffect(() => {
        if (current !== null) {
            setOrder({
                order_id: current.order_id,
                shipped_on: null ? '' : current.shipped_on,
                status: current.status
            });
        } else {
            setOrder({
                shipped_on: '',
                status: '',
                order_id: ''
            });
        }

        if (error) {
            openSnackbar(error);
            clearAll();
        }

        if (msg) {
            openSnackbar(msg);
            clearAll();
        }

        //eslint-disable-next-line
    }, [orderContext, current]);

    const getOrderDetail = (id) => {
        getOneOrder(id)
    };


    if (orders !== null && orders.length === 0 && !loading) {
        return <h4>No orders available</h4>
    }

    if (loading) return <Spinner/>;

    const onChange = e => setOrder({...order, [e.target.name]: e.target.value});

    const onSubmit = (e) => {
        e.preventDefault();
        updateOrder(order);
        setOrder({
            shipped_on: '',
            status: '',
            order_id: ''
        });
        clearAll();
        setWaiting(false);
    };

    const clearAll = () => clearCurrent();



    return (
        <div className="row" style={{overflowX: "hidden"}}>
            <div className="col-xl-6">
                <div className="kt-portlet">
                    <div className="kt-portlet__body">
                        {/*begin::Section*/}
                        <div className="kt-section">
                            <div className="kt-section__content">
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead className="thead-light">
                                        <tr>
                                            <th>#</th>
                                            <th>Customer ID</th>
                                            <th>Name</th>
                                            <th>Reference</th>
                                            <th>Address</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                            <th>Payment Type</th>
                                            <th>Shipped On</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {filtered != null ? filtered.map((order, index) => (
                                            <tr key={order.order_id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{order.customer_id}</td>
                                                <td>{order.User.lastname}{' '}{order.User.firstname}</td>
                                                <td>{order.reference}</td>
                                                <td>{order.address}</td>
                                                <td>{addComma(order.Payments[0].amount)}</td>
                                                <td>
                                                    <span
                                                        className={' kt-badge--inline kt-badge--pill kt-badge--rounded kt-badge ' + (order.status === 'pending' ? 'kt-badge--brand' : (order.status === 'processing') ? 'kt-badge--warning' : (order.status === 'successful') ? 'kt-badge--success' : 'kt-badge--danger')}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td>{`${order.type}`.charAt(0).toUpperCase() + `${order.type}`.slice(1)}</td>
                                                <td>{order.shipped_on === null ? 'Not set yet' : `${order.shipped_on}`.slice(0, 10)}</td>
                                                <td data-field="Actions" className="kt-datatable__cell">
                                                    <span style={{
                                                        overflow: "visible",
                                                        position: "relative",
                                                        width: "130px"
                                                    }}>
                                                        <a href title="View" onClick={() => {
                                                            setCurrent(order);
                                                            setWaiting(true);
                                                        }} className="btn btn-sm btn-clean btn-icon btn-icon-md">
                                                            <i className="la la-edit"/>
                                                        </a>
                                                        <a href title="View"
                                                           onClick={() => {
                                                               getOrderDetail(order.order_id);
                                                               setCurrent(order);
                                                               setDetail(true);
                                                           }}
                                                           className="btn btn-sm btn-clean btn-icon btn-icon-md">
                                                            <i className="la la-eye"/>
                                                        </a>
                                                    </span>
                                                </td>
                                            </tr>
                                        )) : orders.map((order, index) => (
                                            <tr key={order.order_id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{order.customer_id}</td>
                                                <td>{order.User.lastname}{' '}{order.User.firstname}</td>
                                                <td>{order.reference}</td>
                                                <td>{order.address}</td>
                                                <td>{addComma(order.Payments[0].amount)}</td>
                                                <td>
                                                    <span
                                                        className={' kt-badge--inline kt-badge--pill kt-badge--rounded kt-badge ' + (order.status === 'pending' ? 'kt-badge--brand' : (order.status === 'processing') ? 'kt-badge--warning' : (order.status === 'successful') ? 'kt-badge--success' : 'kt-badge--danger')}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td>{`${order.type}`.charAt(0).toUpperCase() + `${order.type}`.slice(1)}</td>
                                                <td>{order.shipped_on === null ? 'Not set yet' : `${order.shipped_on}`.slice(0, 10)}</td>
                                                <td data-field="Actions" className="kt-datatable__cell">
                                                    <span style={{
                                                        overflow: "visible",
                                                        position: "relative",
                                                        width: "130px"
                                                    }}>
                                                        <a href title="View" onClick={() => {
                                                            setCurrent(order);
                                                            setWaiting(true);
                                                        }} className="btn btn-sm btn-clean btn-icon btn-icon-md">
                                                            <i className="la la-edit"/>
                                                        </a>
                                                        <a href title="View"
                                                           onClick={() => {
                                                               getOrderDetail(order.order_id);
                                                               setCurrent(order);
                                                               setDetail(true);
                                                           }}
                                                           className="btn btn-sm btn-clean btn-icon btn-icon-md">
                                                            <i className="la la-eye"/>
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
                                Update Order
                            </h3>
                        </div>
                    </div>
                    <form className="kt-form" onSubmit={onSubmit}>
                        <div className="kt-portlet__body">
                            <div className="kt-section">
                                <div className="form-group" style={{width: "50%", margin: "auto"}}>
                                    <label>Shipping Date:</label>
                                    <input type="date" name="shipped_on" onChange={onChange} className="form-control"/>
                                    <span className="form-text text-muted">Please choose date </span>
                                </div>
                                <div className="col-md-4 kt-margin-b-20-tablet-and-mobile"
                                     style={{marginTop: "60px", margin: "auto", width: "50%"}}>
                                    <div className="kt-form__group kt-form__group--inline">
                                        <div className="kt-form__label">
                                            <label>Status:</label>
                                        </div>
                                        <div className="kt-form__control">
                                            <select onChange={onChange} name="status"
                                                    className="form-control bootstrap-select"
                                                    id="kt_form_status">
                                                <option value="">Select</option>
                                                <option value="pending">Pending</option>
                                                <option value="processing">Processing</option>
                                                <option value="successful">Successful</option>
                                                <option value="canceled">Canceled</option>
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
                {orderDetails && <div className="kt-portlet show_order_detail" style={detail ? orderStyle : null}>
                    <div className="kt-portlet__body kt-portlet__body--fit">
                        <div className="kt-invoice-2">
                            <div className="kt-invoice__wrapper">
                                <div className="kt-invoice__head">
                                    <div className="kt-invoice__container kt-invoice__container--centered">
                                        <div className="kt-invoice__logo">
                                            <a href="#">
                                                <h1>Order Details</h1>
                                            </a>
                                            <a href style={{ float: "left", fontSize: "30px", cursor: "pointer" }} onClick={() => setDetail(false)}>
                                                <i className="la la-close" />
                                            </a>
                                        </div>
                                        <div className="kt-invoice__items">
                                            <div className="kt-invoice__item">
                                                <span className="kt-invoice__subtitle">DATE OF ORDER</span>
                                                <span className="kt-invoice__text">{`${current.createdAt}`.slice(0, 10)}</span>
                                            </div>
                                            <div className="kt-invoice__item">
                                                <span className="kt-invoice__subtitle">INVOICE NO.</span>
                                                <span className="kt-invoice__text">{current.order_id}</span>
                                            </div>
                                            <div className="kt-invoice__item">
                                                <span className="kt-invoice__subtitle">INVOICE TO.</span>
                                                <span className="kt-invoice__text">
                                                    {current.User.firstname}{' '}{current.User.lastname}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="kt-invoice__body kt-invoice__body--centered">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th>PRODUCT</th>
                                                <th>UNIT COST</th>
                                                <th>QUANTITY</th>
                                                <th>TOTAL COST</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                orderDetails.map(orderdetail => (
                                                    <tr key={orderdetail.item_id}>
                                                        <td>{orderdetail.product_name}</td>
                                                        <td>{addComma(`${orderdetail.unit_cost}`.slice(0, 5))}</td>
                                                        <td>{orderdetail.quantity}</td>
                                                        <td className="kt-font-danger">{addComma((orderdetail.unit_cost) * (orderdetail.quantity))}</td>
                                                    </tr>
                                                ))
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="kt-invoice__footer">
                                    <div className="kt-invoice__table  kt-invoice__table--centered table-responsive">
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th>REFERENCE</th>
                                                <th>TYPE</th>
                                                <th>SHIPPING DATE</th>
                                                <th>TOTAL AMOUNT</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{current.reference}</td>
                                                    <td>{`${current.type}`.charAt(0).toUpperCase() + `${current.type}`.slice(1)}</td>
                                                    <td>{current.shipped_on === null ? 'Not set yet' : `${current.shipped_on}`.slice(0, 10)}</td>
                                                    <td className="kt-font-danger">{addComma(current.amount)}</td>
                                                    </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
};

const updateStyle = {
    transform: `translateX(0)`
};

const orderStyle = {
    display: "block"
};
export default OrderTable;