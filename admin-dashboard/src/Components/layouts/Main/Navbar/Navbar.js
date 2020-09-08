import React, {useContext, useEffect} from 'react';
import NavbarProfile from "./NavbarProfile";
import Spinner from "../../Spinner";
import AuthContext from "../../../../context/auth/authContext";

const Navbar = () => {
    const authContext = useContext(AuthContext);
    const {users, loading, loadUser} = authContext;

    useEffect(() => {
        loadUser();

        //eslint-disable-next-line
    }, []);

    if (loading) return <Spinner />;
    return (
        <div id="kt_header" className="kt-header kt-grid__item  kt-header--fixed">
            <div className="kt-header__topbar" style={style}>
                   <NavbarProfile users={users} />
            </div>
        </div>
    );
};

const style = {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%'
};

export default Navbar;