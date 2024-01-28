import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar.jsx';
import style from '../Sidebar/Sidebar.module.css';


const drawerWidth = 240;
export default function Sidebar({ logOut }) {
  let Navigate = useNavigate();
  let location = useLocation();

  return (

    <Box sx={{ position: 'relative' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Navbar variant="h6" noWrap component="div" />
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }, '@media (max-width:600px)': {

          },
        }}
      >
        <Toolbar />
        <Box sx={{ height: 642 }} >
          <List>
            <ul className="navbar-nav  mb-lg-0">
              <div className={`list-item ${style.listItem} ${location.pathname === '/dashboard/communities' ? style.selectedItem : ''}  ${location.pathname === '/dashboard' ? style.selectedItem : ''}`} >
                <li className="nav-item ms-5  mb-2">
                  <Link className="nav-link " to="communities">

                    <i className="fa-solid fa-house " style={{ width: '35px', color: 'black', fontSize: '20px' }} />
                    <span>   Communities  </span>
                  </Link>
                </li>
              </div>
              <div className={`list-item ${style.listItem} ${location.pathname === '/dashboard/admins' ? style.selectedItem : ''}`}>
                <li className="nav-item ms-5 mb-2">
                  <Link className="nav-link " to="admins">

                    <i className="fa-solid fa-users" style={{ width: '35px', color: 'black', fontsize: '20px' }} />
                    <span>  Admins     </span >
                  </Link>
                </li>
              </div>
              <div className={`list-item ${style.listItem} ${location.pathname === '/dashboard/users' ? style.selectedItem : ''}`}>
                <li className="nav-item ms-5 mb-2">
                  <Link className="nav-link " to="users" >

                    <i className="fa-solid fa-users" style={{ width: '35px', color: 'black', fontsize: '20px' }} />

                    <span>   Users  </span>
                  </Link>
                </li>
              </div>
              <div className={`list-item ${style.listItem} ${location.pathname === '/dashboard/Settings' ? style.selectedItem : ''}`}>
                <li className="nav-item ms-5 mb-2" >
                  <Link className="nav-link" to="Settings"  >
                    <i className="fa-solid fa-gear" style={{ width: '35px', color: 'black', fontsize: '20px' }} />
                    <span>   Settings    </span>
                  </Link>
                </li>
              </div>
            </ul>
          </List>
          <ul className={`navbar-nav mb-lg-0 ${style.logout}`}>
            <Divider className='border mt-5' />
            <div className={`list-item ${style.listItem} `}>
              <li className="nav-item ms-5 mb-2" >
                <Link className="nav-link" onClick={logOut}>
                  <i className="fa-solid fa-sign-out " style={{ width: '35px', color: 'black', fontsize: '20px' }} >    </i>

                  <span> Logout </span>
                </Link>
              </li>
            </div>
          </ul>
        </Box>
      </Drawer >
    </Box >
  );
}
