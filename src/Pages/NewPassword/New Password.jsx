import React, { useEffect } from 'react'
import { useState } from 'react'
import { Box, Divider, Typography } from '@mui/material'
import { Button } from '@mui/material'
import { InputText } from "primereact/inputtext";
import style from './NewPassword.module.css'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function NewPassword() {
    let navigate = useNavigate();
    // const goToLogin = () => {
    //     navigate("/")
    // };
    let formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            code: ''
        },
        onSubmit: sendCode
    })

    let [pass, setpass] = useState('');

    function decodepassword() {
        let tokenpass = localStorage.getItem('password');
        let decoded = jwtDecode(tokenpass);
        setpass(decoded);
    }

    async function sendCode(values) {
        try {
            let { data } = await axios.patch('http://localhost:3700/auth/sendCode', values);

            // localStorage.setItem('password', data.user.password);
            // decodepassword();
            // let tokenpass = data.user.password;
            // let decoded = jwtDecode(tokenpass);
            // setpass(decoded);

            console.log((data.user.password))
            console.log(pass)
            if (data.message == 'Success') {


                navigate('/')
                console.log(data);
            }
        }
        catch (err) {
            console.log(err.response.data.message)
        }
    }
    // useEffect((() => {
    //     decodepassword();
    //   }), [])
    return (
        <>
            <div className={`d-flex justify-content-center align-items-center`}>
                <div className={`d-flex  ${style.reset}`}>
                    <Box className={`d-flex justify-content-center align-items-center ${style.asideR}`} >
                        <div className=" mb-5">
                            <div className=''><img src="/Images/Logo1.png" className='' />
                                <p className={`font ms-2 ${style.logoName}`}>CommuNet</p>
                            </div>
                        </div>
                    </Box>
                    <Box className={`d-flex justify-content-center align-items-center ${style.asideL}`} >
                        <form onSubmit={formik.handleSubmit}>

                            <div className="d-flex justify-content-center ">
                                <h2 className='mb-3'>Set New Password</h2>
                            </div>
                            <div className="mb-3 text-center d-flex justify-content-center ">
                                <div className='w-75 '>
                                    <p>Your new password must be different to previouly used passwords.</p>
                                </div>
                            </div>
                            <div className="p-float-label mb-4 d-flex justify-content-between">
                                <InputText
                                    id="email"
                                    type='email'
                                    name='email'
                                    className={`button ${style.TextField}`}
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                                <label htmlFor="email" className='ms-2'>Email</label>
                            </div>
                            <div className={`p-float-label d-flex justify-content-between ${style.input}`}>
                                <InputText
                                    id="password"
                                    type='password'
                                    name='password'
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    className={`${style.TextField}`} />
                                <label htmlFor="email" className='ms-2'>Password</label>
                            </div>

                            <div className="p-float-label mb-4 d-flex justify-content-between">
                                <InputText
                                    id="code"
                                    type='text'
                                    name='code'
                                    value={formik.values.code}
                                    onChange={formik.handleChange}
                                    className={`${style.TextField}`} />
                                <label htmlFor="code" className='ms-2'>Code</label>
                            </div>
                            <div className="d-flex justify-content-center ">
                                <Button type='submit' variant="contained" size='large' className={`button ${style.resetbtn}`} >
                                    Reset Password
                                </Button>
                            </div>
                        </form>
                    </Box>
                </div>
            </div>
        </>
    )
}
