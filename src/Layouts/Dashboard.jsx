import React, { useContext } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../Componants/Dashboard/Sidebar/Sidebar.jsx'
import Navbar from '../Componants/Dashboard/Navbar/Navbar.jsx'
import { UserContext } from '../Context/SaveData.js';

export default function Dashboard() {
  const { setUser } = useContext(UserContext);

  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('role');
    localStorage.removeItem('users');
    localStorage.removeItem('email');
    localStorage.removeItem('admins')
    setUser(null);
    navigate('/');
  }

  return (
    <>
      <Navbar />
      <Sidebar  logOut={logOut}/>
      <Outlet />
    </>
  )
}
