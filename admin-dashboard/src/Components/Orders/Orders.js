import React, {useEffect, useContext, useState} from 'react';
import OrderHeader from "./OrderHeader";
import OrderSearch from "./OrderSearch";
import OrderTable from "./OrderTable";
import Pagination from "./Pagination";
import OrderContext from "../../context/orders/orderContext";
import '../../assets/css/order-details.css';

const Orders = () => {
    const orderContext = useContext(OrderContext);
    const {getOrders, orders, filtered} = orderContext;
    useEffect(() => {
        getOrders();
        //eslint-disable-next-line
    }, []);


    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(10);

    // Get current orders
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    // Change Page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="kt-portlet kt-portlet--mobile">
            <OrderHeader/>
            <OrderSearch/>
            <OrderTable orders={currentOrders} filtered={filtered}/>
            <Pagination ordersPerPage={ordersPerPage} totalOrders={orders.length} paginate={paginate} />
        </div>
    );
};

export default Orders;