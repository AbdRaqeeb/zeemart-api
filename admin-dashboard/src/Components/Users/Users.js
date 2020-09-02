import React from 'react';
import MobileToggle from "./MobileToggle";
import UserMenu from "./UserMenu";
import UserContent from "./UserContent";

const Users = () => {

    return (
        <div className="kt-grid kt-grid--desktop kt-grid--ver kt-grid--ver-desktop kt-app">
            <MobileToggle />
            <UserMenu />
            <UserContent />
        </div>
    );
};

export default Users;