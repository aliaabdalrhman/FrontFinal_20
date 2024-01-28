// UserContext.js
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    function saveCurrentUser() {
        let token = localStorage.getItem('userToken');
        let decoded = jwtDecode(token);
        setUser(decoded);
    }

    useEffect(() => {
        if (localStorage.getItem('userToken')) {
            saveCurrentUser();
        }
    }, [])


    return (
        <UserContext.Provider value={{ user, setUser, saveCurrentUser }}>
            {children}
        </UserContext.Provider>
    );
};
