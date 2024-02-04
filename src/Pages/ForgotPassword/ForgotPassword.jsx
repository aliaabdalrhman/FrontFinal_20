import React from 'react'
import { useState } from 'react'
import { Box, Divider, Typography } from '@mui/material'
import { Button } from '@mui/material'
import { InputText } from "primereact/inputtext";
import style from './ForgotPassword.module.css'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';


export default function ForgotPassword() {
    let navigate = useNavigate();

    let formik = useFormik({
        initialValues: {
            email: '',
        },
        onSubmit: sendCode
    })

    async function sendCode(values) {
        try {
            let { data } = await axios.patch('http://localhost:3700/auth/sendCode', values);
            console.log(data);
            if (data.message == 'Success') {
                toast.success("Success !");
                navigate('/newpassword')
            }
        }
        catch (err) {
            toast.error(err);
            console.log(err)
        }
    }
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
                                <h2 className='mb-3'>Forgot Password</h2>
                            </div>
                            <div className="mb-4 d-flex justify-content-center ">
                                <p>No Worries, we'll send you reset Instructions.</p>
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
                            <div className="d-flex justify-content-center ">
                                <Button type='submit' variant="contained" size='large' className={`button ${style.resetbtn}`} >
                                    send code
                                </Button>
                            </div>
                        </form>
                    </Box>
                </div>
            </div>
        </>
    )
}
