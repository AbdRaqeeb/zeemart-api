import React from 'react';
import CustomerItem from "./CustomerItem";
import Spinner from "../layouts/Spinner";

const CustomerTable = ({ customers, loading, filtered }) => {

    if (customers !== null && customers.length === 0 && !loading) {
        return <h4>No customer available</h4>
    }

    if (loading) return <Spinner />;

    return (
        <div className="row">
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
                                            <th>User ID</th>
                                            <th>Name</th>
                                            <th>Phone</th>
                                            <th>Total Order</th>
                                            <th>Total Payment</th>
                                            <th>Address</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {filtered != null ? filtered.map((customer, index) => (
                                            <CustomerItem key={customer.id} customer={customer} index={index} />
                                        )) : customers.map((customer, index) => (
                                            <CustomerItem key={customer.id} customer={customer} index={index} />
                                        )) }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/*end::Section*/}
                    </div>

                    {/*end::Form*/}
                </div>
            </div>
        </div>
    );
};

export default CustomerTable;