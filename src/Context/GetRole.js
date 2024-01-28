// UserContext.js
import React, { createContext, useEffect, useState } from 'react';

export const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
    const [role, setRole] = useState('');

    function getRole() {
        setRole(localStorage.getItem('role'));

    }
    useEffect(() => {
        getRole();
    }, [])


    return (
        <RoleContext.Provider value={{ role, setRole, getRole }}>
            {children}
        </RoleContext.Provider>
    );
};
