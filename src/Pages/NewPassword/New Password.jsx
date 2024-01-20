import React from 'react'
import { useState } from 'react'
import { Box, Divider, Typography } from '@mui/material'
import { Button } from '@mui/material'
import { InputText } from "primereact/inputtext";
import style from './NewPassword.module.css'
import { useNavigate } from 'react-router-dom';

export default function NewPassword() {
    let navigate = useNavigate();
    const goToLogin = () => {
        navigate("/")
    };

    return (
        <>
            <div className={`d-flex justify-content-center align-items-center`}>
                <div className={`d-flex  ${style.reset}`}>
                    <Box className={`d-flex justify-content-center align-items-center ${style.asideR}`} >

                    </Box>
                    <Box className={`d-flex justify-content-center align-items-center ${style.asideL}`} >
                        <form >

                            <div className="d-flex justify-content-center ">
                                <h2 className='mb-3'>Set New Password</h2>
                            </div>
                            <div className="mb-3 text-center d-flex justify-content-center ">
                                <div className='w-75 '>
                                    <p>Your new password must be different to previouly used passwords.</p>
                                </div>
                            </div>
                            <div className={`p-float-label d-flex justify-content-between ${style.input}`}>
                                <InputText id="password" type='password' className={`${style.TextField}`} />
                                <label htmlFor="email" className='ms-2'>Password</label>
                            </div>

                            <div className="p-float-label mb-4 d-flex justify-content-between">
                                <InputText id="Cpassword" type='password' className={`${style.TextField}`} />
                                <label htmlFor="email" className='ms-2'>Confirm Password</label>
                            </div>
                            <div className="d-flex justify-content-center ">
                                <Button variant="contained" size='large' onClick={goToLogin} className={`button ${style.resetbtn}`} >
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
