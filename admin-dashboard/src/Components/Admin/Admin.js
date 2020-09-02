import React, {useContext, useEffect} from 'react';
import AdminHeader from "./AdminHeader";
import AdminSearch from "./AdminSearch";
import AdminTable from "./AdminTable";
import AdminContext from "../../context/admin/adminContext";

const Admin = () => {
    const adminContext = useContext(AdminContext);
    const {getAdmins, filtered, admins} = adminContext;
    useEffect( () => {
        getAdmins();

        //eslint-disable-next-line
    }, []);

    return (
        <div className="kt-portlet kt-portlet--mobile">
            <AdminHeader />
            <AdminSearch />
            <AdminTable admins={admins} filtered={filtered} />
        </div>
    );
};

export default Admin;