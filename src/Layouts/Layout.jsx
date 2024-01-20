import React from 'react'
import Navbar from '../Componants/Web/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Componants/Web/Sidebar/Sidebar'

export default function Layout() {
    return (
        <>
            <Navbar />
            <Sidebar />
            <Outlet />
        </>
    )
}
