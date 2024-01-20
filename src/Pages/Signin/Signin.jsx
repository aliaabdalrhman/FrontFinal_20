import { Divider, Typography } from '@mui/material'
import React, { useState } from 'react'
import style from './Signin.module.css'
import { Button } from '@mui/material'
import { InputText } from "primereact/inputtext";
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { SignInSchema } from '../Schemas/Signin';
import axios from 'axios';



export default function Signin() {
  let navigate = useNavigate();

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignInSchema,
    onSubmit: sendSignInData,

  })


  async function sendSignInData(values) {
    let  {data}  = await axios.post('https://abr-dcxu.onrender.com/auth/signin', values)
      console.log(data)
      .catch((err) => {
        console.log('error')
      //   // setStatusError(err.response.data.stack.split(" ").slice(1, 5).join(" "));
      });
    
    // if (data.message == "User signed in successfully") {
      // setErroes([]);
      // setStatusError(' ');
      // localStorage.setItem('Token', data.refreshtoken);
      // saveCurrentUser();
      // console.log('welcome'); 
      // navigate('/communities');
    // }
    // else {
    //   setErroes(data.validationError);
    // }
  }


  const GotoSignUp = () => {
    navigate('/signup');
  }

  // const GoTOHome = () => {
  //   navigate('/communities');
  // }

  return (
    <div className={`d-flex justify-content-center align-items-center`}>
      <div className={`d-flex  ${style.signin}`}>
        <div className={`d-flex justify-content-center align-items-center ${style.asideL}`} >
          <form onSubmit={formik.handleSubmit} >
            <div className="d-flex justify-content-center ">
              <h2 className='mb-5'>Sign in to ABR </h2>
            </div>
            <div className={`p-float-label ${style.input}`}>
              <InputText id="email"
                type='email'
                className={`textfield ${style.TextField} `}
                name='email'
                 value={formik.values.email}
                onChange={formik.handleChange} />
              <label htmlFor="email" className='ms-2'>Email</label>

            </div>
            <div className="p-float-label mb-2">
              <InputText id="password"
                type='password'
                className={`textfield ${style.TextField}`}
                name='password'
                 value={formik.values.password}
                onChange={formik.handleChange} />
              <label htmlFor="password" className='ms-2'>Password</label>
            </div>
            <div className='ms-1'>
              <Link className={`text-decoration-none ${style.forgot}`} to='forgotPassword' style={{ color: '#156ac0' }}> Forgot Password ?</Link>
            </div>
            <div className="d-flex justify-content-center mt-2">
              <Button  type='submit' variant="contained" className={`button ${style.signinbtn}`} >
                Sign in
                </Button>
            </div>

            <div className="d-flex justify-content-center mt-2 ">
              <Divider className={`mt-2 ${style.divider}`} />
            </div>
            <div className="d-flex justify-content-center mt-2">
              <p >
                or continue with
              </p>
            </div>
            <div className={`d-flex justify-content-center  ${style.icons}`} >
              <i className="fa-brands fa-google"></i>
              <i className="fa-brands fa-facebook-f"></i>
            </div>
          </form>
        </div>
        <div className={`d-flex justify-content-center align-items-center ${style.asideR}`} >
          <div>
            <div className="d-flex justify-content-center mb-5">
              <i className="fa-regular fa-star" style={{ fontSize: 80 }}></i>
            </div>
            <div className="d-flex justify-content-center mb-4 ">
              <h1>Hello, Friends !</h1>
            </div>
            <div className="d-flex justify-content-center mb-4 ">
              <Typography className='font w-75 text-capitalize'>
                Welcome to ABR Website Enter Your Personal details and start journey with us.
              </Typography>
            </div>
            <div className="d-flex justify-content-center mb-5 ">
              <Button variant="" className={`button ${style.signupbtn}`}
                onClick={GotoSignUp}
              >
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
