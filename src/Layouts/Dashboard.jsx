import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Componants/Dashboard/Sidebar/Sidebar.jsx'
import Navbar from '../Componants/Dashboard/Navbar/Navbar.jsx'

export default function Dashboard() {
  return (
   <>
   <Navbar/>
   <Sidebar/>
   <Outlet/>

   </>
  )
}
