import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import style from './Navbar.module.css'
import axios from 'axios';

export default function Navbar() {

    const [image, setImage] = useState({});
    async function getInformation() {
        try {
            let { data } = await axios.get(`http://localhost:3700/userDo/${localStorage.getItem('email')}/viewMyPersonalInformation`);
            { data.image == null ? setImage(null) : setImage(data.image.secure_url) }
        }
        catch (error) {
            console.log('error:', error);
        }
    }
    useEffect(() => {
        getInformation();
    }, [])
    return (
        <nav className={`navbar navbar-expand-lg bg-body-tertiary fixed-top border-bottom shadow-sm ${style.navbar} `}>
            <Link className={`navbar-brand text-white ${style.Logo} `} >
                <div className='d-flex'>
                    <img src="/Images/Logo.png" />
                    <span className='font ms-2 mt-2'>CommuNet</span>
                </div>
            </Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto me-5 mb-2 mb-lg-0">
                    <li className='nav-item'>
                        <Link className="nav-link" to="communities">
                            <i className="fa-solid fa-house" style={{ color: '#ffffff', fontSize: '22px', marginTop: '5px' }} /> </Link>
                    </li>
                    <li className='nav-item'>
                        <Link className="nav-link" to="Settings" ><Avatar src={image} style={{ width: '30px', height: '30px' }} alt='' /></Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
