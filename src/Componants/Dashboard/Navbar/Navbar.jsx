import { Avatar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import style from './Navbar.module.css'

export default function Navbar() {
    return (
        <nav class={`navbar navbar-expand-lg bg-body-tertiary fixed-top border-bottom shadow-sm ${style.navbar} `}>
            <a class={`navbar-brand text-white ${style.Logo} `} href="#"> Dashboard Navbar </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto me-5 mb-2 mb-lg-0">
                    <li className={`nav-item `}>
                        <Link class="nav-link" to="communities">
                            <i className="fa-solid fa-house" style={{ color: '#ffffff', fontSize: '22px', marginTop: '5px' }} /> </Link>
                    </li>
                    <li className={`nav-item`}>
                        <Link class="nav-link" to="Settings" ><Avatar src='img/image1.jpg' style={{ width: '30px', height: '30px' }} alt='' /></Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
