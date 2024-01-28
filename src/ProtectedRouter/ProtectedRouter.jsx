import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRouter({ children }) {
    if (localStorage.getItem('userToken') && localStorage.getItem('role') == 'User') {
        return <>{children}</>
    }
    else {
        return <Navigate to='/'></Navigate>
    }
}
