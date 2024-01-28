import { Avatar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import style from './Navbar.module.css'

export default function Navbar() {
    return (
        <>       <nav className={`navbar navbar-expand-lg bg-body-tertiary fixed-top border-bottom shadow-sm ${style.navbar} `}>
            <Link className={`navbar-brand text-white ${style.Logo} `} > Dashboard Navbar </Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto me-5 mb-2 mb-lg-0">
                    <li className='nav-item'>
                        <Link className="nav-link" to="communities">
                            <i className="fa-solid fa-house" style={{ color: '#ffffff', fontSize: '22px', marginTop: '5px' }} /> </Link>
                    </li>
                    <li className='nav-item'>
                        <Link className="nav-link" to="Settings" ><Avatar src='img/image1.jpg' style={{ width: '30px', height: '30px' }} alt='' /></Link>
                    </li>
                </ul>
            </div>
        </nav>
        </>






    )
}
