import React, {useContext, useEffect} from 'react';
import UserAccount from "./UserAccount";
import AuthContext from "../../context/auth/authContext";

const UserContent = () => {
    const authContext = useContext(AuthContext);

    const { users, loadUser } = authContext;

    useEffect(() => {
        loadUser();

        //eslint-disable-next-line
    }, []);
    return (
        <div className="kt-grid__item kt-grid__item--fluid kt-app__content">
            <UserAccount users={users}/>
        </div>
    );
};

export default UserContent;