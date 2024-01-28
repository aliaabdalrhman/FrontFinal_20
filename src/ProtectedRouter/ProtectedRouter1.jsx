import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRouter1({ children }) {
    if (localStorage.getItem('userToken') && (localStorage.getItem('role') == 'SuperAdmin' || localStorage.getItem('role') == 'SubAdmin')) {
        return <>{children} </>
    }
    else {
        return <Navigate to='/'></Navigate>
    }
}