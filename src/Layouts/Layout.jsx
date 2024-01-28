import React, { useContext } from 'react'
import Navbar from '../Componants/Web/Navbar/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../Componants/Web/Sidebar/Sidebar'
import { UserContext } from '../Context/SaveData';

export default function Layout() {

    const { setUser } = useContext(UserContext);

    let navigate = useNavigate();

    function logOut() {
        localStorage.removeItem('userToken');
        localStorage.removeItem('role');
        localStorage.removeItem('email')
        setUser(null);

        navigate('/');
    }
    return (
        <>
            <Navbar />
            <Sidebar logOut={logOut} />
            <Outlet />
        </>
    )
}
