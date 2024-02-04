import React, { useEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
import Signin from './Pages/Signin/Signin';
import Signup from './Pages/Signup/Signup';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import Communities from './Componants/Web/Communities/Communities.jsx';
import AdminCommunities from './Componants/Dashboard/Communities/Communities.jsx';
import MyPosts from './Componants/Web/MyPosts/MyPosts';
import MyComment from './Componants/Web/MyComment/MyComment';
import Community from './Componants/Web/Community/Community';
import AdminCommunity from './Componants/Dashboard/Community/Community';
import Setting from './Componants/Web/Settings/Settings';
import AdminSetting from './Componants/Dashboard/Settings/Settings';
import NotFound from './Pages/NotFound/NotFound';
import Dashboard from './Layouts/Dashboard';
import CreateCommunity from './Componants/Dashboard/CreateCommunity/CreateCommunity';
import Users from './Componants/Dashboard/Users/Users';
import Admins from './Componants/Dashboard/Admins/Admins';
import Layout from './Layouts/Layout.jsx';
import { UserProvider } from './Context/SaveData.js';
import NewPassword from './Pages/NewPassword/New Password.jsx';
import ProtectedRouter from './ProtectedRouter/ProtectedRouter.jsx';
import ProtectedRouter1 from './ProtectedRouter/ProtectedRouter1.jsx';
import { RoleProvider } from './Context/GetRole.js';
import { EmailProvider } from './Context/GetEmail.js';
import UpdateCommunity from './Componants/Dashboard/UpdateCommunity/UpdateCommunity.jsx';
import { ToastContainer } from 'react-toastify';

export default function App() {


  let routers = createBrowserRouter([
    { index: true, element: <Signin /> },
    // { path: '', element: <Signin /> },
    { path: 'signup', element: <Signup /> },
    { path: 'forgotpassword', element: <ForgotPassword /> },
    { path: 'newpassword', element: <NewPassword /> },
    {
      path: '/', element: <ProtectedRouter> <Layout /></ProtectedRouter>, children: [
        { path: 'communities', element: <Communities /> },
        { path: 'myposts', element: <MyPosts /> },
        { path: 'myComment', element: <MyComment /> },
        { path: 'communities/:_id', element: <Community /> },
        { path: 'settings', element: <Setting /> },
      ]
    },
    {
      path: 'dashboard', element: <ProtectedRouter1><Dashboard /></ProtectedRouter1>, children: [
        { path: '', element: <AdminCommunities /> },
        { path: 'communities', element: <AdminCommunities /> },
        { path: 'communities/:_id', element: <AdminCommunity /> },
        { path: 'communities/createcommunity', element: <CreateCommunity /> },
        { path: 'users', element: <Users /> },
        { path: 'admins', element: <Admins /> },
        { path: 'settings', element: <AdminSetting /> },
        { path: 'communities/updatecommunity/:_id', element: <UpdateCommunity /> },
        // { path: '*', element: <NotFound /> }
      ]
    },
    { path: '*', element: <NotFound /> }
  ])

  return (
    <>

      <UserProvider>
        <RoleProvider>
          <EmailProvider>
            <RouterProvider router={routers} />
          </EmailProvider>
        </RoleProvider>
      </UserProvider>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}
