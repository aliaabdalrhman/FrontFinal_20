// UserContext.js
import React, { createContext, useEffect, useState } from 'react';

export const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
    const [Email1, setEmail1] = useState('');

    function getEmail() {
        setEmail1(localStorage.getItem('email'));

    }
    useEffect(() => {
        getEmail();
    }, [])


    return (
        <EmailContext.Provider value={{ Email1, setEmail1, getEmail }}>
            {children}
        </EmailContext.Provider>
    );
};