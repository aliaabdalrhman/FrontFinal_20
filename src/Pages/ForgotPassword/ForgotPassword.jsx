import React from 'react'
import { useState } from 'react'
import { Box, Divider, Typography } from '@mui/material'
import { Button } from '@mui/material'
import { InputText } from "primereact/inputtext";
import style from './ForgotPassword.module.css'
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    let navigate = useNavigate();
    const GoToNewPass=()=>{
        navigate('/newpassword')
    }
    return (
        <>
            <div className={`d-flex justify-content-center align-items-center`}>
                <div className={`d-flex  ${style.reset}`}>
                    <Box className={`d-flex justify-content-center align-items-center ${style.asideR}`} >

                    </Box>
                    <Box className={`d-flex justify-content-center align-items-center ${style.asideL}`} >
                        <form >

                            <div className="d-flex justify-content-center ">
                                <h2 className='mb-3'>Forgot Password</h2>
                            </div>
                            <div className="mb-4 d-flex justify-content-center ">
                                <p>No Worries, we'll send you reset Instructions.</p>
                            </div>

                            <div className="p-float-label mb-4 d-flex justify-content-between">
                                <InputText id="email" type='email' className={`button ${style.TextField}`} />
                                <label htmlFor="email" className='ms-2'>Email</label>
                            </div>
                            <div className="d-flex justify-content-center ">
                                <Button variant="contained" size='large' onClick={GoToNewPass} className={`button ${style.resetbtn}`} >
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
