import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.jsx";
import Dashboard from "./Dashboard.jsx";
import Users from "../Componants/Dashboard/Users/Users.jsx";
import Admins from "../Componants/Dashboard/Admins/Admins.jsx";
import AdminCommunities from "../Componants/Dashboard/Communities/Communities.jsx";
import Signin from "../Pages/Signin/Signin.jsx";
import Signup from "../Pages/Signup/Signup.jsx";
import NotFound from "../Pages/NotFound/NotFound.jsx";
import Communities from "../Componants/Web/Communities/Communities.jsx";
import MyPosts from "../Componants/Web/MyPosts/MyPosts.jsx";
import MyComment from "../Componants/Web/MyComment/MyComment.jsx";
import Community from "../Componants/Web/Community/Community.jsx";
import AdminCommunity from '../Componants/Dashboard/Community/Community.jsx'
import Setting from "../Componants/Web/Settings/Settings.jsx";
import AdminSetting from '../Componants/Dashboard/Settings/Settings.jsx'
import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword.jsx";
import NewPassword from "../Pages/NewPassword/New Password.jsx";
import CreateCommunity from "../Componants/Dashboard/CreateCommunity/CreateCommunity.jsx";




export const router = createBrowserRouter([
  { index: true, element: <Signin /> },
  { path: '', element: <Signin /> },
  { path: 'signup', element: <Signup /> },
  { path: 'forgotpassword', element: <ForgotPassword /> },
  { path: 'newpassword', element: <NewPassword /> },

  {
    path: '/', element: <Layout />, children: [
      { path: 'communities', element: <Communities /> },
      { path: 'myposts', element: <MyPosts /> },
      { path: 'myComment', element: <MyComment /> },
      { path: 'communities/community', element: <Community /> },
      { path: 'settings', element: <Setting /> },
      { path: '*', element: <NotFound /> }
    ]
  },
  {
    path: 'dashboard', element: <Dashboard />, children: [
      // { path: '', element: <AdminCommunities /> },
      { path: 'communities', element: <AdminCommunities />},
      { path: 'communities/community', element: <AdminCommunity /> },
      { path: 'communities/createcommunity', element: <CreateCommunity /> },
      { path: 'users', element: <Users /> },
      { path: 'admins', element: <Admins /> },
      { path: 'settings', element: <AdminSetting /> },
      { path: '*', element: <NotFound /> }

    ]
  },

])
