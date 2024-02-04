import { Divider, Typography } from '@mui/material'
import React, { useState } from 'react'
import style from './Signin.module.css'
import { Button } from '@mui/material'
import { InputText } from "primereact/inputtext";
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { SignInSchema } from '../Schemas/Signin';
import axios from 'axios';
import { UserContext } from '../../Context/SaveData';
import { useContext } from 'react';
import { toast } from 'react-toastify';



export default function Signin() {
  let navigate = useNavigate();
  let [StatusError, setStatusError] = useState('');
  let [errors, setErroes] = useState([]);

  const { saveCurrentUser } = useContext(UserContext);

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: sendSignInData,

  })


  async function sendSignInData(values) {
    let { data } = await axios.post('http://localhost:3700/auth/signin', values)
      .catch((err) => {
        console.log(err)
        setStatusError(err.response.data.message);
      });

    if (data.message == "User signed in successfully") {
      setErroes([]);
      setStatusError(' ');
      localStorage.setItem('userToken', data.refreshtoken);
      localStorage.setItem('role', data.role)
      localStorage.setItem('email', data.email)
      saveCurrentUser();
      if ((data.role == 'SuperAdmin') || (data.role == 'SubAdmin')) {
        navigate('/dashboard/communities');
      }
      else if (data.role == 'User') {
        navigate('/communities');
      }
    }

  }

  const GotoSignUp = () => {
    navigate('/signup');
  }


  return (
    <div className={`d-flex justify-content-center align-items-center`}>
      <div className={`d-flex  ${style.signin}`}>
        <div className={`d-flex justify-content-center align-items-center ${style.asideL}`} >
          <form onSubmit={formik.handleSubmit} >
            <div className="d-flex justify-content-center ">
              <h2 className='mb-5'>Sign in  </h2>
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
              <Link className={`text-decoration-none mt-1 mb-1${style.forgot}`} to='forgotPassword' style={{ color: '#156ac0' }}> Forgot Password ?</Link>
            </div>
            <div className=" text-danger text-capitalize">
              {StatusError}
            </div>
            <div className="d-flex justify-content-center mt-2">
              <Button type='submit' variant="contained" className={`button ${style.signinbtn}`} >
                Sign in
              </Button>
            </div>
          </form>
        </div>
        <div className={`d-flex justify-content-center align-items-center ${style.asideR}`} >
          <div>
            <div className=" mb-5">
              <div className=''><img src="/Images/Logo1.png" className='' />
                <p className={`font ms-2 ${style.logoName}`}>CommuNet</p>
              </div>
            </div>
            {/* <div className="d-flex justify-content-center mb-4 ">

            </div> */}
            <div className="d-flex justify-content-center mb-4 ">
              <Typography className='font w-75 text-capitalize'>
                Hello, Friends !
                Welcome to  CommuNet Website .
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
