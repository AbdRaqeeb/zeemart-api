import React, {useContext, useEffect, useState} from 'react';
import CustomersHeader from "./CustomersHeader";
import CustomerSearch from "./CustomerSearch";
import CustomerTable from "./CustomerTable";
import Pagination from "./Pagination";
import CustomerContext from "../../context/customers/customerContext";

const Customers = () => {
    const customerContext = useContext(CustomerContext);
    const { customers, getCustomers, loading, filtered } = customerContext;


    useEffect(() => {
        getCustomers();

        //eslint-disable-next-line
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const [customersPerPage] = useState(10);

    // Get current orders
    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

    // Change Page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);



    return (
        <div className="kt-portlet kt-portlet--mobile">
            <CustomersHeader/>
            <CustomerSearch/>
            <CustomerTable customers={currentCustomers} filtered={filtered} loading={loading} />
            <Pagination paginate={paginate} customersPerPage={customersPerPage} totalCustomers={customers.length}/>
        </div>
    );
};

export default Customers;