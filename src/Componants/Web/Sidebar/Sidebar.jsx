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
import style from './Sidebar.module.css';

const drawerWidth = 240;

export default function Sidebar({ logOut }) {
    let location = useLocation();


    return (
        <Box sx={{ display: 'flex' }}  >
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Navbar variant="h6" noWrap component="div" />
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ height: 642 }}  >
                    <List >
                        <ul className="navbar-nav  mb-lg-0">
                            <div className={`list-item ${style.listItem} ${location.pathname === '/communities' ? style.selectedItem : ''} `} >
                                <li className="nav-item ms-5  mb-2">
                                    <Link className="nav-link " to="communities" >
                                        <i className="fa-solid fa-house  " style={{ width: '35px', color: 'black', fontSize: '20px' }} />
                                        <span>  Communities</span>
                                    </Link>
                                </li>
                            </div>
                            <div className={`list-item ${style.listItem} ${location.pathname === '/myposts' ? style.selectedItem : ''} `}>
                                <li className="nav-item ms-5 mb-2">
                                    <Link className="nav-link " to="myposts" >
                                        <i className="fa-regular fa-file-lines " style={{ width: '35px', color: 'black', fontSize: '20px' }} />
                                        <span>  My Posts </span >
                                    </Link>
                                </li>
                            </div>
                            <div className={`list-item ${style.listItem} ${location.pathname === '/mycomment' ? style.selectedItem : ''} `}>
                                <li className="nav-item ms-5 mb-2">
                                    <Link className="nav-link " to='mycomment' >

                                        <i className="fa-regular fa-comment " style={{ width: '35px', color: 'black', fontsize: '20px' }} />
                                        <span> My Comments</span>
                                    </Link>
                                </li>
                            </div>
                            <div className={`list-item ${style.listItem} ${location.pathname === '/userSettings' ? style.selectedItem : ''} `}>
                                <li className="nav-item ms-5 mb-2" >
                                    <Link className="nav-link" to="Settings" >

                                        <i className="fa-solid fa-gear" style={{ width: '35px', color: 'black', fontsize: '20px' }} />
                                        <span> Settings </span>
                                    </Link>
                                </li>
                            </div>
                        </ul>
                    </List>
                    <ul className={`navbar-nav mb-lg-0 ${style.logout}`}>
                        <Divider className='border mt-5' />
                        <div className={`list-item ${style.listItem} `}>
                            <li className="nav-item ms-5 mb-2" onClick={logOut} >
                                <Link className="nav-link" >
                                    <span>
                                        <i className="fa-solid fa-sign-out " style={{ width: '35px', color: 'black', fontsize: '20px' }} />
                                    </span>Logout
                                </Link>
                            </li>
                        </div>
                    </ul>
                </Box>
            </Drawer>
        </Box>
    );
}
